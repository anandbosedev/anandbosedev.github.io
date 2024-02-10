---
layout: post
title: Continuous Integration for Android projects - A setup overview
tags: ['Android', 'CI', 'Docker', 'GitHub']
---
Continuous Integration is an important aspect in the software industry to accelerate the development workflow. With continuous integration, we can build the project, execute test cases, check code with lint and store artifacts and reports in the cloud on every phase of the software development.

## How CI platform works in the cloud?

Most of the [PaaS (platform as a service)](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-paas/) CI platforms are generalistic to build, test, deploy any kind of software. It works exactly as the configuration provided in a specific file, or multiple files in a specific directory. Also, it keeps the build artifacts, test reports and has a caching mechanism to speed-up further process. In most cases we use containers, which contains the required SDKs and environments pre-configured.

In the beginning of the CI configuration, we specify a container image hosted in a container registry such as [Docker Hub](https://hub.docker.com), [GitHub Container Registry](https://ghcr.io), [Quay by RedHat](https://quay.io) etc. The CI platform will start a [VM (virtual machine)](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-a-virtual-machine/) instance, checkout the code in a workspace directory, create a container with the specified image and setup environment and access to the workspace directory. The allocated resources for the VM (CPU, memory and storage capacity) depends on the CI platforms and their subscription plans.

Next, we define the jobs. Jobs are a set of commands that can be executed sequentially to achieve a particular target. For example, a typical build job contains commands like "build module 1", "build module 2", "assemble module 1 and module 2", "pack the executable app and libraries", "deploy build" etc. A typical test job contains "setup testing environment", "execute test case A", "execute test case B", "generate reports" etc. Jobs can be independent or can be configured to be dependent on other jobs. If the jobs are independent, the CI platform will try to execute them in parallel by spinning up multiple container instances to execute them independently. Also, we can specify when a job can be triggered. It can be configured to execute on push, pull request, on particular time intervals, or can be triggered manually.

Most CI platforms provides infrastructure to keep build artifacts, lint and test reports in their infrastructure so that we can continuously track them during the phases of software development.

> *Updating...*