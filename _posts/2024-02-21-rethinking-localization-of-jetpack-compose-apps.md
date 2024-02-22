---
layout: post
title: Rethinking the state of localization in Jetpack Compose — A Kotlin-first approach to localization
tags: ['Android', 'JetpackCompose', 'Localization']
--- 

Most of the Jetpack Compose applications depends on the Android resources system for localization. This is okay and works just fine and follows the system locale. But there are some side-effects on this approach.

1. You have to rely on Android's resource system, which restricts multiplatform portability.
2. To access a string of different locale, you need to create another `Context` with overridden locale configuration, which is expensive.
3. If your app wants to change the locale by itself, you need to override the base context of the activity and restart it. Restarting activity causes unpleasant user experience.

The motto of Jetpack Compose is to build UI with declarative Kotlin code, and to put Kotlin-first approach to the every aspect of the application. Why don't we think about a Kotlin-first approach to localization?

## Motivation

I am highly motivated on how Jetpack Compose implements the Material theme. Every properties of the material design is accessible seamlessly with `MaterialTheme` object throughout the entire compose application. For example, suppose I need to reference the Material design color and typography, I can seamlessly access the Material design properties like this:

```kotlin
Column {
    Text(
        text = "Hello, World!",
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.primary,
    )
}
```
If we change the Material design properties from anywhere in the app, the compose framework will detect the changes and ✨ *magically* ✨ recompose the composables affected by the theme change.

Just like this, I just want to access the localized strings independently, and I want compose framework to recompose the parts of the app which will be affected by the locale change. This is the picture in my mind:

```kotlin
Column {
    Text(
        text = Strings.greeting, // "Hello, World!"
        style = MaterialTheme.typography.bodyMedium,
        color = MaterialTheme.colorScheme.primary,
    )
}
```
## CompositionLocal is here for the rescue!

With CompositionLocal, you can pass the data down through the composition hierarchy without explicitly defining them as parameters. The value of the CompositionLocal is provided by `CompositionLocalProvider` composable. It also lets you to override the local value any time with `CompositionLocalProvider` composable.

For every CompositionLocal, we have to provide a default value, because the Compose framework will use the default value if the hierarchy doesn't provide them with a `CompositionLocalProvider` composable. This is pretty neat, because we can define our localized strings as CompositionLocal initialized with the values of default locale.

Initially we will define an interface which contains string properties with their default values.

```kotlin
interface DefaultStrings {
    // The companion object will serve as a default instance of the interface.
    companion object : DefaultStrings

    val greeting: String
        get() = "Hello, World!"
    
    val appName: String
        get() = "Foo app"
}
```
> You might be thinking how it is possible to provide implementations for the properties in an interface. Kotlin supports providing default implementations for methods and properties in an interface. If the implementing class doesn't override a property, the default implementation will be in action.

Now I will be translating the strings and create a class implementing the `DefaultStrings` interface.

```kotlin
object SpanishStrings : DefaultStrings {
    override val greeting: String
        get() = "¡Hola Mundo!"

    // I don't want to translate the appName, so I am skipping it to use the DefaultStrings.appName.
}
```
Next, we need to declare a `CompositionLocal` of the `DefaultStrings` interface as `LocalStrings` and control the value of it using `CompositionLocalProvider`.

```kotlin
val LocalStrings = compositionLocalOf<DefaultStrings> { DefaultStrings }

@Composable
fun MyLocalizedApp() {
    var locale by rememberSaveable {
        mutableStateOf("en")
    }
    val strings = when (locale) {
        "es" -> SpanishStrings
        "fr" -> FrenchStrings
        "ar" -> ArabicStrings
        else -> DefaultStrings
    }
    MyLocalizedAppTheme {
        CompositionLocalProvider(
            LocalStrings provides strings
        ) {
            Column {
                Text(text = LocalStrings.current.greeting)

                Button(onClick = { locale = "de" }) {
                    Text(text = "German")
                }

                Button(onClick = { locale = "fr" }) {
                    Text(text = "French")
                }

                Button(onClick = { locale = "ar" }) {
                    Text(text = "Arabic")
                }
            }
        }
    }
}
```

The state change of the `locale` will recompose the `CompositionLocalProvider` with the localized instance of the `DefaultStrings` interface. The compose framework will automatically recomposes the composables consuming the `LocalStrings` composition local.

Tip: Instead of writing the lengthy `LocalStrings.current.<whatever>` you can simplify it by declaring something like this:

```kotlin
val Strings: DefaultStrings
    @Composable
    @ReadOnlyComposable
    get() = LocalStrings.current

// This will provides us a much simpler accessor for localized strings

@Composable
fun Greeting() {
    Text(text = Strings.greeting)
}
```
In a nutshell,
* If you want to get the localized version of the greeting, use `Strings.greeting`. This will recompose the consumers when the CompositionLocal `LocalStrings` changes.
* If you want the greeting in the default locale (English), use `DefaultStrings.greeting`. This will not change and neither triggers recomposition.
* If you want the greeting in Spanish language, use `SpanishStrings.greeting`. This also will not change and neither triggers recomposition.


Cool, isn't it? With this approach you can build a localization framework for your Jetpack Compose application in pure Kotlin that scales throughout the entire application. Since you are not using the Android's resource system for localization, you don't have to restart the activity for changing the locale of the base context, which will significantly reduce the jank when the application switches the locale by itself.