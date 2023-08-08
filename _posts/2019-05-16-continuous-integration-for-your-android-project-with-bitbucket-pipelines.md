---
layout: post
title: Continuous Integration for your Android project with BitBucket Pipelines
tags: ['AndroidDev', 'Docker']
image: /images/posts/2019-05-16-continuous-integration-for-your-android-project-with-bitbucket-pipelines/header.jpeg
---
BitBucket Pipelines aren’t new to us. Pipelines allows us to configure automated builds and tests on every step of the development, and it makes the test results and build artifacts readily available for the team. If you’re using BitBucket to keep your source code, you can set up continuous integration for your Android projects with BitBucket Pipelines easily.

The first step for implementing CI is to create a Docker image that contains the preferred version of Android SDK. You have to specify the dependencies, build tools and platform tools required to build your project.

_If you don’t want to build SDK image by yourself, you can prefer to use prebuilt image [anandbose16/android-sdk:28.0.3](https://hub.docker.com/r/anandbose16/android-sdk) to implement CI for your Android Project._

### Get started with Docker

You don’t have to dig in-depth into the theories of Linux Containers and Docker. All you need to do is to create a _Dockerfile_ and specify how to pack the Android SDK to a self contained image. Also, you need to [install Docker](https://hub.docker.com/search/?type=edition&offering=community) in your computer, and an account in [Docker hub](https://hub.docker.com/) for hosting the image. You can make use of Docker plugin of Visual Studio code, for guidance. It will be advisable to have a basic knowledge of Linux containers, Docker and some bash commands.

Let’s prepare the _Dockerfile_:

To build the image locally, open Terminal and run:

```js
cd ~/path/to/directory
docker build -t "<username>/android-sdk:28.0.3" .
```

Once the image is ready, push it to your Docker hub public repository.

```html
docker login -u <username> -p <password>
docker push "<username>/android-sdk:28.0.3"
```

### Configure BitBucket Pipelines in your project

In your repository page, go to **Settings — Pipelines settings** and enable it.

![](/images/posts/2019-05-16-continuous-integration-for-your-android-project-with-bitbucket-pipelines/bb-pipeline-settings.png)

You have to create an app password. It is necessary to upload the built artifacts to Download section. For this, navigate to **Account settings **— **App passwords — Create app password**. Keep the generated password to a safe place, because BitBucket won’t save it anywhere.

![](/images/posts/2019-05-16-continuous-integration-for-your-android-project-with-bitbucket-pipelines/bb-app-passwords.png)

All right, go to **Account variables** section and **create a new variable** named `BB_AUTH_STRING` with value `<username>:<app password>` format. This variable will be available as environment variable in the container image. So, you can safely upload the build artifacts, without compromising the authentication credentials.

![](/images/posts/2019-05-16-continuous-integration-for-your-android-project-with-bitbucket-pipelines/bb-env-variables.png)

Now create _bitbucket-pipelines.yml_ in the root of the project, and add these lines:

`git commit && git push`

Volia! BitBucket pulls the Docker image you built, and runs the commands in the _bitbucket-pipelines.yml_ file, and after 2–3 minutes, APKs will be available in the Downloads section!

![](/images/posts/2019-05-16-continuous-integration-for-your-android-project-with-bitbucket-pipelines/bb-artifacts.png)

### But, there is a catch!

You got 2 problems with this:

-   **Problem A:** The script will generate builds for whatever you push — if it is a breaking change or a smaller patch, doesn’t matter. For free accounts, BitBucket provides only 50 minutes per month. Your quota might exceed within a few pushes!
-   **Problem B:** Every build will have different signature. Because, during every build, an arbitrary debug keystore will be generated, and the package will be signed with it. Therefore, you cannot install the build artifacts without uninstalling the previous installation. Also, the signature dependent operations like authentication, In App Purchases, Google Maps or signature protected permissions, might break.

**Let’s solve problem A:**

BitBucket allows different workflows for different branches. You can create a special branch for that. Let it be `android-ci` branch. You modify your _bitbucket-pipelines.yml_ like this:

The `branches` directive will run when you push any commits only to that specific branch. So, for other development branches, the pipelines will not build the project. When you really need a build, just checkout the branch and merge your development branch to it. Clean and simple.

**Here’s the solution for problem B:**

You have to use the same debug keystore for every build. For achieving this, copy your _debug.keystore_ to the root directory of your project.

```js
cp ~/.android/debug.keystore ~/MyAndroidProject/
```

And, add a `signingConfigs` rule in _app/build.gradle_:

Problem solved! The next subsequent builds will be signed with the same keystore, hence the generated builds will have same signature. So, you can use these builds to update the existing installation, and also it is possible to share them happily with your clients and team as well.