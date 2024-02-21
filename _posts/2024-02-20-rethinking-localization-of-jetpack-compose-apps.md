---
layout: post
title: Rethinking the localization of Jetpack Compose applications
tags: ['Android', 'JetpackCompose', 'Localization']
draft: true
---

Most of the Jetpack Compose applications still depends on the Android resources system for localization. This is okay and works just fine for Android world, but for Compose multiplatform we might need to think and tinker on an alternativ solution. The motivation of Jetpack Compose is UI as Kotlin code by itself without depending on XML for defining initial UI state. Similar to this, we need to rethink localization as declarative and idiomatic Kotlin code instead of platform dependent XML files.

## Motivation

I am highly motivated on how Jetpack Compose implements the Material theme. Every properties of the material design is accessible seamlessly with `MaterialTheme` object throughout the entire compose application. For example, suppose I need to reference the Material design color and typography, I can seamlessly access the Material design properties like this:

```kotlin
Column {
    Text(
        text = "Hello!",
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.primary,
    )
}
```
If we change the Material design properties from anywhere in the app, the compose framework will detect and *magically* recompose branches of the UI tree affected by the property changes.

Just like this, I just want to access the localized strings, and I want the compose framework to recompose the UI when I change the locale. This is the picture in my mind:

```kotlin
Column {
    Text(
        text = Strings.loginPage.titleText,
        style = MaterialTheme.typography.titleLarge,
        color = MaterialTheme.colorScheme.primary,
    )
    Text(
        text = Strings.loginPage.bodyText,
        style = MaterialTheme.typography.bodyMedium,
    )
}
```
