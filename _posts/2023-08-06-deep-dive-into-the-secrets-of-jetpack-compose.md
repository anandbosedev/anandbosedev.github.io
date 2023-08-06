---
layout: post
title: Deep dive into the secrets of Jetpack Compose
tags: ['AndroidDev', 'JetpackCompose']
image: /images/posts/2023-08-06-deep-dive-into-the-secrets-of-jetpack-compose/jetpack-compose-2.jpg
---
Jetpack Compose is the modern technology built upon the solid foundation of Kotlin, which enables us to express the UI in a declarative way. The compose compiler abstracts and keeps us away from the heavy and complicated state management. In short, with Compose, we can express UI as a function of the underlying state and Compose compiler will do the rest for us.

The following questions came to my mind when I started learning Compose.

1. How Compose do the state management under the hood?
2. Why `@Composable` functions are not callable from outside of the compose world?
3. How Compose *remembers* the state even if it has a functional approach?

The documentation somewhat answers these questions, however I took a *reverse engineering* approach to have a deep understanding of these points. For achieving that, I made a simple counter app in Compose.

```kotlin
@Composable
fun CounterApp() {
    var count by remember {
        mutableStateOf(0)
    }
    Column(
        modifier = Modifier.padding(8.dp),
    ) {
        Text(
            text = count.toString(),
            fontSize = 56.sp,
            modifier = Modifier.align(Alignment.CenterHorizontally)
        )
        Row(
            modifier = Modifier.align(Alignment.CenterHorizontally)
        ) {
            Button(onClick = { count += 1 }) {
                Text(text = "Increment")
            }
            Spacer(
                modifier = Modifier.width(8.dp)
            )
            Button(onClick = { count -= 1 }) {
                Text(text = "Decrement")
            }
        }
    }
}
```

This is how the app looks like:
<video style="width: 100%;" controls alt="The video of the simple counter app with two buttons for incrementing and decrementing value.">
    <source src="/images/posts/2023-08-06-deep-dive-into-the-secrets-of-jetpack-compose/Screen Recording 2023-08-06 at 10.26.18 AM.mov" type="video/quicktime">
</video>

# Reverse Engineering Compose app

To decompile the app, I used [dex2jar](https://github.com/pxb1988/dex2jar) for decompiling APK file, and [jd-gui](https://github.com/java-decompiler/jd-gui) for decompiling JAR to human-readable source.

```shell
% ./dex-tools-2.1/d2j-dex2jar.sh app-debug.apk 
dex2jar app-debug.apk -> ./app-debug-dex2jar.jar
% java -jar ./jd-gui-1.6.6-min.jar app-debug-dex2jar.jar
```
In the JD-GUI window, I navigated to the `MainActivityKt.class` file and looked for the `CounterApp()` method. The compose compiler adds these additional parameters:

![Decompiled Java code in JD-GUI app](/images/posts/2023-08-06-deep-dive-into-the-secrets-of-jetpack-compose/counter-app-fn-transformed.jpg)

Unlike the normal functions, composables can re-compose during the change of state. The `Composer` parameter injected by the compiler is responsible for determining the state changes and estimates the branches of the tree that needs to be rebuilt for representing the present state. Unlike the behavior of the call stack, composable functions can execute in any order, and the runtime can off-load the calls from the main thread too, if required.

The compiler added a huge pile of carefully crafted codes within the `CounterApp()` implementation. The generated codebase is too huge and barely readable, and contains a lot of state management code: 

![The size of Compose code vs Compiler generated code](/images/posts/2023-08-06-deep-dive-into-the-secrets-of-jetpack-compose/jetpack-compose-generated.jpg)

Basically, Jetpack compose does some additional work to handle the following cases during state changes:

* Handle the nodes affected by the state change.
* Handle the modifications (new nodes and deleted nodes) of the tree during the state change.
* Reuse the unmodified nodes.

To achieve this, Jetpack compose wraps the nodes as *restart groups* and *replaceable groups*. In the reverse engineered code, it can be found that the `CounterApp` is modified as the components are wrapped in restart groups and replaceable groups. Here is the pseudo-code of the `CounterApp` tree grouped by the compose compiler:

```kotlin
startRestartGroup(key = 215168731) {
    startReplaceableGroup(key = -492369756) {
        // check rememberedValue, set default if it is not initialized
    }
    startReplaceableGroup(key = -483455358) {
        // column measure policy and other stuffs
        Column(...)
        startReplaceableGroup(key = -1323940314) {
            // consume density, layout direction and view configuration from CompositionLocal
            
            // node reuse code

            startReplaceableGroup(key = 2058660585) {
                Text(...)
                startReplaceableGroup(key = 693286680) {
                    // determine row measurement policy
                    Row(...)
                    startReplaceableGroup(key = -1323940314) {
                        // consume density, layout direction and view configuration from CompositionLocal

                        // node reuse code
                        
                        startReplaceableGroup(key = 2058660585) {
                            // set row scope
                            startReplaceableGroup(key = 1157296644) {
                                // check and update rememberedValue
                                Button(...)
                            }
                            startReplaceableGroup(key = 1157296644) {
                                // check and update rememberedValue
                                Button(...)
                            }
                        }
                    }
                }
            }
        }
    }
}
```