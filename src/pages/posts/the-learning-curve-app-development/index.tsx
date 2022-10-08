import * as React from 'react'
import Layout from '../../../components/Layout'
import Article from '../../../components/Article'
import { Contents } from '../../../Contents'
import { HeadFC } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import videoMp4 from './video.mp4'
import videoWebm from './video.webm'
import RecentPosts from '../../../components/RecentPosts'

const CONTENT_PATH = '/posts/the-learning-curve-app-development'
const content = Contents.find(content => content.path == CONTENT_PATH)!

const ArticlePage = () => (
    <Layout>
        <Article title={content.title} shortDescription={content.shortDescription} date={content.date}>
            <p>Say hello to my new Android project <a href="https://play.google.com/store/apps/details?id=qa.applab.qweather&amp;hl=en">Q Weather, a visual weather application for Qatar cities and worldwide</a>. I’m celebrating the release of the app in this month, and <strong><em>the best app ever I made in my career!</em></strong> It was such a fabulous experience, as I got the incredible opportunity to deep dive in the latest technologies for app development. Moreover, I learned the best practices, do’s and don’ts during the entire lifecycle of the app development. And, I’m very thankful to the company and my team mates for their valuable help and coordination.</p>
            <p>When I started the development of the Q Weather application, I have been welcomed by a lot of technological choices. In order to develop a best performing application, every technological choice must be analyzed and finalized from the application’s point of view. It should be based on the perspective from the experience that should be delivered to the user on efficient and best possible way.</p>
            <h2 id="choose-the-battlefield">Choose the battlefield</h2>
            <p>The day 1 started with the enumeration and comparison of different software development frameworks. At first, I have to choose one from cross platform technologies from <strong><em>Flutter, React Native</em></strong> or develop with native SDK for the platform<strong><em>.</em></strong></p>
            <p><StaticImage src="img-1.jpeg" alt="" /></p>
            <p>Flutter and React Native is good for developing cross platform projects, that consists of pages and navigations. The immensely popular React Native comes with the goodness of <strong><em>React framework</em></strong>, <strong><em>Redux</em></strong> for state management, and the scalability of <strong><em>Javascript</em></strong>. On the other hand, <strong><em>Flutter</em></strong> comes with a high performance rendering engine <strong><em>Skia</em></strong>, and <strong><em>Dart programming language</em></strong> is optimized for declarative UI development. Flutter has a wide collection of stateful and stateless widgets, that resembles the native counterparts.</p>
            <p>Since the application has to deliver a lot of visual effects, I choose not to prefer React Native, because I will probably end up in writing plugins, thereby exposing myself to the native APIs. Flutter is a good choice at that time. It comes with a high performance rendering engine that ensures at least 60fps, is a good match. But I noticed the memory usage of Flutter is not that good, and sometimes Flutter bashed with “out of memory” errors. Later, I found that happened inside the framework, which I have no control over it. Also, both Flutter and React Native applications have their payload bundled to the app, so download size is larger than the native counterpart.</p>
            <p><strong><em>Finally, the decision was made — go with native development!</em></strong></p>
            <p><StaticImage src="img-2.png" alt="" /></p>
            <h2 id="choose-theweapon">Choose the&nbsp;weapon</h2>
            <p>Android SDK came up with another choice of programming languages — whether I can use the shiny new Kotlin or prefer the traditional Java.</p>
            <p><em>I choose Kotlin simply because — <strong>I love Kotlin!</strong></em></p>
            <p><StaticImage src="img-3.png" alt="" /></p>
            <p>As the documentation says Kotlin is interoperable with Java, all of the Android APIs can be accessible from Kotlin also. The Kotlin standard library comes with a bunch of extension methods, that might be missing in Java or inaccessible due to <code>minApi</code> constraints. At first, it attracted me with type inference, null safety, expressiveness and convenience. The <code>kotlin-android-extensions</code> plugin automatically generates the delegates for binding views from XML to the code, that made me to forget the <code>findViewById</code> method entirely.</p>
            <p>Later, I met the ultimate rockstar in Kotlin — the <strong><em>coroutines</em></strong>! I converted every blocking or asynchronous function to <strong><em>suspend functions</em></strong>, that looks and behaves exactly like normal functions, under a coroutine context. <strong><em>So, I can create multi-threaded application without bothering about threads!</em></strong> Basically, dispatchers of coroutines are thread pool executors, so I can achieve parallelism for an array of concurrent IO / networking operations, that made the operations like data synchronization faster than ever!</p>
            <h2 id="choose-thestrategy">Choose the&nbsp;strategy</h2>
            <p>Choosing a suitable architectural pattern is important for the present and future of any software project. The greatest minds in Google has engineered the pitfalls in existing Android SDK and API components, and they developed the Android Jetpack to solve them. Also, the architectural pattern has shifted from bare MVC to a combination of MVP and MVVM, and reduced the friction to a greater extent.</p>
            <p><StaticImage src="img-4.png" alt="" /></p>
            <h3 id="livedata-and-viewmodel">LiveData and ViewModel</h3>
            <p>Architecture components loosely couples the underlying repository and the user interface. The data storage, manipulation and all business logic happens in the repository, and the changes will be made to reflect in the UI by the lifecycle aware streams called <strong><em>LiveData</em></strong>. The architecture components are powerful enough to mix and match different LiveData streams, like <code>map</code> and <code>switchMap</code> operators, MediatorLiveData and so on.</p>
            <p>Survival of configuration changes were a nightmare for Android developers. Previously, a simple orientation change can reset the entire state of the activity, and drives them to do database query / REST API call again. Android activity consists of <code>onSaveInstanceState</code> and <code>onRestoreInstanceState</code>methods, but in most cases, that won’t help much. <strong><em>ViewModel</em></strong> solves this issue. It resides in the memory until the activity is completely destroyed. <strong><em>After the restart of the activity, ViewModel brings back the UI to the state where it left off.</em></strong></p>
            <h3 id="room-persistence-library">Room Persistence Library</h3>
            <p>The another notable component is Room persistence library. Room is a SQLite backed data persistence library, that provides a solid structure for dealing with relational data store. In your application, Room brings DAOs (Data Access Objects) for querying, and storing data. Your SQL queries are validated during compile time and some code is generated to execute the query, read data and convert them to entity objects. Moreover, Room provides <strong><em>transactional database operations</em></strong>, that lets you combine multiple database operations to a single block. This has 2 advantages&nbsp;:- The observers will be notified only after successful transaction. If transaction fails, the database will be rolled back to its original state. Also, Room makes it easier for migrating database, when you push updates to your application.</p>
            <p>The biggest advantage of using Jetpack components is they are very co-operative to each other. For example, Room library can query data in a worker thread and returns them as entity object collections. Instead of returning a data structure from the query method, you can modify it to return a LiveData, so the library itself manages to observe the data, and updates the UI accordingly if the data changes. <strong><em>This guarantees the data displayed in the UI is up to date with the backing store. That is a massive advantage!</em></strong></p>
            <h3 id="its-allkotlin">It’s all&nbsp;Kotlin.</h3>
            <p>Since the Kotlin is getting wildly popular among the Android developers, Google made the Jetpack library more Kotlin friendly. The bonus I got here is, I can write the SQL queries as suspend functions, so I can use them seamlessly in coroutines. That gives me the guarantee that the SQL queries will be executed in background thread, even if I call them in a main thread dispatcher. <strong><em>Hence, Kotlin Coroutines ensures that the main thread will NEVER blocked under any circumstances!</em></strong></p>
            <h2 id="localization-challenge">Localization Challenge</h2>
            <p><StaticImage src="img-5.jpeg" alt="" /></p>
            <p>The Arabic localization is a bit challenge for me, because this was my first application that I’m playing with bi-directional layouts and strings. According to the documentation, create another <code>strings.xml</code> file with exact keys and translated strings, and put it in another resource directory <code>values-ar</code>. Also, in layouts, make use <code>start</code> and <code>end</code> instead of <code>left</code> and <code>right</code> for ensuring the required layout for RTL languages.</p>
            <p>What can I do for switching language directly from the application? Well, I have to build another context with different language configuration, and <em>recreate</em> the activities. That drags me to the hell of most worst case — the state loss! The fragment manager also losses state, and begins from the home fragment. Total disaster.</p>
            <p>The best and the fastest way of changing language is to replace all strings with the localized equivalent, and change the layout direction if necessary. This sounds awkward and heavy, but there is no way out. I simplified the approach by making use of architecture components.</p>
            <p>In the application, there is a global singleton class that contains the configuration of the running app. Obviously, there is a <code>String locale</code> field. I refactored the field to <code>MutableLiveData&lt;String&gt;</code> and made the localization aware components observe to it. Whenever I want to switch the language, I just need to call <code>locale.postValue(langCode)</code>, the entire application flips without losing the state!</p>
            <h2 id="animations-animations-and-animations">Animations, animations and animations!</h2>
            <video autoPlay loop muted playsInline>
                <source src={videoMp4} type='video/mp4' />
                <source src={videoWebm} type='video/webm' />
            </video>
            <p>Animations poses crucial impact to the user experience. Q Weather app has some fine animations of cloud movement, rain, thunderstorm, snowfall and so on. I started with a custom view that draws rain drop particles based on physics and time. The clouds are images with alpha layers, are drawn using ImageViews. To move the cloud, I used <code>ViewPropertyAnimation</code> class and animated <code>translationX</code>property. But the result is, unfortunately, not came up to my expectation. The animation is too laggy, and even laggier during transition between weather states.</p>
            <p><em>The fact I learned is: Use a single view subclass for rendering all backstage animations. The <code>onDraw</code> method of the <code>View</code> class gives you a hardware accelerated canvas by default. Compute the positions of the elements and render them within the same canvas, and call <code>invalidate</code> after you finish drawing.</em></p>
            <p>Please be careful not to perform memory allocations in <code>onDraw</code> or <code>onMeasure</code>methods. Because, <code>onDraw</code> and <code>onMeasure</code> methods are called frequently. The framework will call <code>onDraw</code> for rendering every frame, and <code>onMeasure</code> will be called during layout process. Hence, preallocate the required memory before layout and draw. Also, make use of primitive types instead of boxed types for performance, because boxed types are basically primitives wrapped in objects, boxing and unboxing operations will cost you performance penalties. If you are using Kotlin, be vary to use primitive array types such as <code>IntArray</code> or <code>FloatArray</code> instead of <code>Array&lt;Int&gt;</code> or <code>Array&lt;Float&gt;</code>.</p>
            <h2 id="wire-up-the-navigation">Wire up the navigation</h2>
            <p>Using fragment manager for navigation will be cumbersome when the project becomes bigger and more complex. Thanks to the navigation library, that brings iOS storyboards to Android! When you got a bunch of fragments, you can place them in the navigation storyboard, and wire up routes to create transitions between fragments. Also, it supports type-safe arguments to send them along with the route traversal, that makes the code less error prone.</p>
            <h2 id="deploy">Deploy!</h2>
            <p>With a sudden spark of excitement, I got the command from the company — <strong>“deploy the app to Google Play!”</strong>. Instantly, I made a release build from Android Studio, and it has a size of 29 MB. That seems to be oversized a little bit.</p>
            <p>I started digging deeper on better deployment practices, and I found these four techniques can reduce the size of the app:</p>
            <ul>
                <li>Remove unused resources</li>
                <li>Convert raster images to WebP (with Android Studio)</li>
                <li><code>minifyEnabled true</code></li>
                <li>Android app bundling and Dynamic delivery</li>
            </ul>
            <p>Finally, the size of the app got reduced to <strong><em>5–7 MB</em></strong> range, depending upon the screen density. However, I choose not to split the string resources by language, because the app requires to change the language by the user. The ~7MB size is unbelievable, and installs within seconds!</p>
            <hr></hr>
            <h2 id="give-it-atry">Give it a&nbsp;try!</h2>
            <p>Q Weather is available in Google Play and App Store for free. Here comes the link, you can try it out today.</p>
            <p>App Store Link — <a href="https://toappsto.re/qweather">https://toappsto.re/qweather</a></p>
            <p>Google Play Store — <a href="https://play.google.com/store/apps/details?id=qa.applab.qweather">https://play.google.com/store/apps/details?id=qa.applab.qweather</a></p>
        </Article>
        <RecentPosts excludeContentPath={CONTENT_PATH} />
    </Layout>
)

export default ArticlePage
export const Head: HeadFC = () => <title>{content.title}</title>