---
layout: post
title: Continuous Integration for Android projects - A journey towards containerized workflows
tags: ['Android', 'CI', 'Docker', 'TestAutomation']
---
Continuous Integration is an important aspect in the software industry to accelerate the development workflow. With continuous integration, we can build the project, execute test cases, check code with lint and store artifacts and reports in the cloud on every phase of the software development.

## About CI platforms

Most of the [PaaS (platform as a service)](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-paas/) CI platforms are generalistic to build, test, deploy any kind of software. It works exactly as the configuration provided in a specific file, or multiple files in a specific directory. Also, it keeps the build artifacts, test reports and has a caching mechanism to speed-up further process. In most cases we use containers, which contains the required SDKs and environments pre-configured.

In the beginning of the CI configuration, we specify a container image hosted in a container registry such as [Docker Hub](https://hub.docker.com), [GitHub Container Registry](https://ghcr.io), [Quay by RedHat](https://quay.io) etc. The CI platform will start a [VM (virtual machine)](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-virtual-machine/) instance, checkout the code in a workspace directory, create a container with the specified image and setup environment and access to the workspace directory. The allocated resources for the VM (CPU, memory and storage capacity) depends on the CI platforms and their subscription plans.

Next, we define the jobs. Jobs are a set of commands that can be executed sequentially to achieve a particular target. For example, a typical build job contains commands like "build module 1", "build module 2", "assemble module 1 and module 2", "pack the executable app and libraries", "deploy build" etc. A typical test job contains "setup testing environment", "execute test case A", "execute test case B", "generate reports" etc. Jobs can be independent or can be configured to be dependent on other jobs. If the jobs are independent, the CI platform will try to execute them in parallel by spinning up multiple container instances to execute them independently. Also, we can specify when a job can be triggered. It can be configured to execute on push, pull request, on particular time intervals, or can be triggered manually.

Most CI platforms provides infrastructure to keep build artifacts, lint and test reports in their infrastructure so that we can continuously track them during the phases of software development.

## CI setup for Android projects

For setting up CI for Android projects, we need to start with build a container image with Android SDK, Gradle and dependencies like OpenJDK and some command-line utilities. Later, we write configurations for the CI platform to use the image, build the project, execute test cases and upload artifacts.

### Create Android SDK container image with Docker

First, we need to install Docker engine in the host system. You can follow the [official documentation of the Docker](https://docs.docker.com/engine/) to install Docker engine. If you are running Linux, I recommend to [set up rootless mode](https://docs.docker.com/engine/security/rootless/) to work with Docker without admin privileges. You can also use [Podman](https://podman.io) which offers a [rootless & daemonless](https://www.redhat.com/en/topics/containers/what-is-podman) environment to operate containers as a drop-in replacement for Docker. Also Podman comes pre-installed on Linux distributions like [Fedora](https://fedoraproject.org).

> To proceed further with this article, it is advised to have a basic knowledge in shell-scripting and understanding of Docker and [Dockerfile commands](https://docs.docker.com/engine/reference/builder/). If you don't want to dive deeper to this, you can always checkout my reference implementations of Android SDK container images at the GitHub repo [anandbosedev/android-sdk](https://github.com/anandbosedev/android-sdk).

For building the container image, we can start with a linux distribution image. The Debian image contains the `apt` package manager configured with repositories with vast collection of software is good for us to install the requirements. Let's start with creating a `Dockerfile`:

```Dockerfile
FROM debian:12.4-slim

# Fetch updates from the repositories, perform a full-update to install security patches. We need OpenJDK for Gradle, curl for networking, and some compression utilities.

RUN apt update && \
apt full-upgrade -y && \
apt install -y openjdk-17-jdk curl tar zip unzip zstd

# It is good to have zstd package installed, as GitHub workflows use zstd for better compression of caches.
```

Next, we will install Android SDK command-line utilities, as a starting point for Android SDK installation

```Dockerfile
# Here we will download and extract Android SDK command-line tools to /opt/android directory

RUN mkdir -p /opt/android && \
curl 'https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip' -o /tmp/commandlinetools.zip && \
unzip /tmp/commandlinetools.zip -d /opt/android && \
rm /tmp/commandlinetools.zip

# We will arrange the directories, as required by Android SDK

RUN mv /opt/android/cmdline-tools /opt/android/latest && \
mkdir /opt/android/cmdline-tools && \
mv /opt/android/latest /opt/android/cmdline-tools/

# We need to set ANDROID_SDK_ROOT environment variable to let the Gradle locate the Android SDK installation.

ENV ANDROID_SDK_ROOT=/opt/android
```

Next, we need to proceed with Gradle installation

```Dockerfile
RUN curl --location --show-error --url 'https://services.gradle.org/distributions/gradle-8.6-bin.zip' -o /tmp/gradle.zip && \
unzip /tmp/gradle.zip -d /opt && \
rm /tmp/gradle.zip && \
mv /opt/gradle-8.6 /opt/gradle

ENV GRADLE_HOME=/opt/gradle
```
Finally, we need to install the required Android SDK components to the container image. Android SDK comes with `sdkmanager`, a command-line utility to install additional SDK components. You can invoke `sdkmanager --list` to see the list of available Android SDK components. We can optionally update the `PATH` environment variable to directly invoke `gradle`, `adb`, `emulator` from the shell.

```Dockerfile
# Installation of Android SDK components requires licenses to be accepted. So we pipe 'yes' to the sdkmanager for license agreement prompts

RUN yes | /opt/android/cmdline-tools/latest/bin/sdkmanager --install \
'emulator' \
'platform-tools' \
'build-tools;34.0.0' \
'platforms;android-34'

# Add Gradle, Android command-line tools, platform tools and emulator to $PATH

ENV PATH="${PATH}:${GRADLE_HOME}/bin:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${ANDROID_SDK_ROOT}/emulator"
```

To build the image with the Dockerfile, run this in the terminal:

```sh
docker build --tag android-sdk:latest .
```
> Note: The above command will build a container with the provided tag name for use in host only. To publish the container image, you have to create account in container registries (DockerHub, GitHub packages etc.) and tag the image with fully qualified name of the image in registry. (eg. `docker.io/<username>/android-sdk:<version>`, `ghcr.io/<username>/android-sdk:<version>`)

To publish the image, login to the registry with `docker login` command and push the image with `docker push` command:

```sh
# Login to DockerHub registry
docker login docker.io
# Login to GitHub container registry
docker login ghcr.io

# Push to DockerHub
docker push docker.io/<username>/android-sdk:<version>
# Push to GitHub container registry
docker push ghcr.io/<username>/android-sdk:<version>
```
Congrats! You have successfully bundled Android SDK to a container image! Now, let's see how we can use this image in our CI pipelines.

### Setup CI with GitHub Workflows

In this section, we will set up CI for a Android project hosted in a GitHub repository. The configuration for GitHub workflows are written in YAML format and located on `.github/workflows` directory. A basic build workflow will look like this:

```yaml
name: Android Project Build Workflow

# Configure the workflow to run every push on main branch
on:
  push:
    branches: [ main ]

# Define a build job which runs on Ubuntu VM and uses the Android SDK container image for a pre-built Android SDK toolchain environment
jobs:
  build:
    runs-on: ubuntu-latest
    container: 
      image: anandbose16/android-sdk:34
    steps:
      - uses: actions/checkout@v4
      - name: Build project with Gradle
        run: gradle clean :app:assembleDebug
      - name: Upload builds to artifact registry
        uses: actions/upload-artifact@v4
        with:
          name: 'build'
          path: app/build/outputs/apk/debug/app-debug.apk
```

That's it! You can extend this workflow to build lint reports, run automated tests and deploy to Google Play store and so on. You can checkout my GitHub repo [anandbosedev/android-ci-demo](https://github.com/anandbosedev/android-ci-demo) which contains the templates of advanced CI configurations for GitHub, GitLab, BitBucket and Azure Pipelines. You can freely copy them to kickstart your journey of CI in your Android projects!