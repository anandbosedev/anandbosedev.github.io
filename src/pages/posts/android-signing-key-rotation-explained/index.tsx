import * as React from 'react'
import Layout from '../../../components/Layout'
import Article from '../../../components/Article'
import { Contents } from '../../../Contents'
import { StaticImage } from 'gatsby-plugin-image'
import { HeadFC } from 'gatsby'
import { BashCodeBlock } from '../../../components/CodeBlocks'
import RecentPosts from '../../../components/RecentPosts'

const CONTENT_INDEX = 0
const content = Contents[CONTENT_INDEX]

const ArticlePage = () => {
    return (
        <Layout>
            <Article
                title={content.title}
                date={content.date}
                shortDescription={content.shortDescription}>

                <p>From the Android developer documentation:</p>
                <blockquote>
                    <p>
                        Android 9 (API level 28) supports APK key rotation, which gives apps the ability to change
                        their signing key as part of an APK update. To make rotation practical, APKs must indicate
                        levels of trust between the new and old signing key. To support key rotation, we updated the
                        APK signature scheme from v2 to v3 to allow the new and old keys to be used. V3 adds information
                        about the supported SDK versions and a proof-of-rotation struct to the APK signing block.
                    </p>
                </blockquote>
                <p>This breaks down to these minority use cases:</p>
                <ul>
                    <li>You are targetting your app for Android 9 or later.</li>
                    <li>Your keystore is going to expire soon. Still you are supporting the project, and have to publish updates.</li>
                    <li>The project is handed over to a new company, and they have to use their key to sign the updates.</li>
                </ul>
                <p>However, it doesn’t mean to solve these situations:</p>
                <ul>
                    <li>Loss of keystore.</li>
                    <li>Signing apps which targets Android prior to 9 (Pie, API 28).</li>
                </ul>
                <p>
                    The introduction of key rotation have minor impact around the developers for now, and most of us don’t
                    really care about it. But the cryptographic advancements over the APK siging schemes from v1 to v4
                    is appreciable. The APK signing scheme v2 detects the tampering of zip central directory, and also
                    improve the speed of installation. V3 introduced key rotation and the ability to sign with multiple
                    keystores. The preview V4 scheme produces a new kind of signature in a separate file (apk-name.apk.idsig).
                    This scheme supports ADB incremental APK installation, which speeds up APK install.
                </p>
                <p>
                    For better understanding, here is an illustrative example.
                    <StaticImage src='../../../images/key_rotation.jpeg' alt='' />
                </p>
                <h3 id="lets-get-started">Let’s get started</h3>
                <p>
                    Let’s start with an unsigned build of the application
                    <code>app-release-unsigned.apk</code>.
                    First of all, let’s create a keystore with <code>keytool</code>.
                    Here’s how.
                </p>
                <BashCodeBlock code={`$ keytool -genkeypair \\
> -alias first \\
> -keyalg RSA \\
> -keysize 4096 \\
> -validity 10000 \\
> -keypass ******** \\
> -keystore first.jks \\
> -storepass ******** \\
> -storetype PKCS12

What is your first and last name?
  [Unknown]:  First
What is the name of your organizational unit?
  [Unknown]:  Example
What is the name of your organization?
  [Unknown]:  Example
What is the name of your City or Locality?
  [Unknown]:  Example
What is the name of your State or Province?
  [Unknown]:  Example
What is the two-letter country code for this unit?
  [Unknown]:  IN
Is CN=First, OU=Example, O=Example, L=Example, ST=Example, C=IN correct?
  [no]:  yes`} />
                <p>Next, sign your application with the keystore <code>first.jks</code>.</p>
                <BashCodeBlock code={`$ apksigner sign \\
> --ks first.jks \\
> --in app-release-unsigned.apk \\
> --out app-first.apk
Keystore password for signer #1: ********`} />
                <p>Now, you have your application signed with <code>first.jks</code> to <code>app-first.jks</code>. Generate your second keystore <code>second.jks</code>.</p>
                <BashCodeBlock code={`$ keytool -genkeypair \\
> -alias second \\
> -keyalg RSA \\
> -keysize 4096 \\
> -validity 10000 \\
> -keypass ******** \\
> -keystore second.jks \\
> -storepass ******** \\
> -storetype PKCS12`} />
                <p>This will ask the same questions as asked when you created the first key. After that, sign your app with second key to <code>app-second.apk</code>.</p>
                <BashCodeBlock code={`$ apksigner sign \\
> --ks second.jks \\
> --in app-release-unsigned.apk \\
> --out app-second.apk
Keystore password for signer #1: ********`} />
                <p>All right. Now, verify the both apps are signed with the correct keys.</p>
                <BashCodeBlock code={`$ apksigner verify -v --print-certs app-first.apk 
Verifies
Verified using v1 scheme (JAR signing): true
Verified using v2 scheme (APK Signature Scheme v2): true
Verified using v3 scheme (APK Signature Scheme v3): true
Number of signers: 1
Signer #1 certificate DN: CN=First, OU=Example, O=Example, L=Example, ST=Example, C=IN
Signer #1 certificate SHA-256 digest: b3f51e5541d0952099f14c2e8b0c1cdd7c50d4378f6ed5b29ad10613e86d6bfc
Signer #1 certificate SHA-1 digest: 583905f0bea5b7e33a14296d3dfed320706d37b3
Signer #1 certificate MD5 digest: fd7c9b3ae1c1b57aa8a4dd9a6e23f56b
Signer #1 key algorithm: RSA
Signer #1 key size (bits): 4096
Signer #1 public key SHA-256 digest: fb4a91fdaf390e50b023191c58983de2cf57423cf920d7d6132d16062793081f
Signer #1 public key SHA-1 digest: 4810c2293d6cdf901e422c70494c69b3fdad7902
Signer #1 public key MD5 digest: 314d879ff989fb8d2c7dbdde23b14e8c
.... (output redacted for brevity)

$ apksigner verify -v --print-certs app-second.apk
Verifies
Verified using v1 scheme (JAR signing): true
Verified using v2 scheme (APK Signature Scheme v2): true
Verified using v3 scheme (APK Signature Scheme v3): true
Number of signers: 1
Signer #1 certificate DN: CN=Second, OU=Example, O=Example, L=Example, ST=Example, C=IN
Signer #1 certificate SHA-256 digest: 1c7642f167f13281932c4d6f0df654217117ede891e529dc4cecb590ec92e365
Signer #1 certificate SHA-1 digest: 6581fe770a6a676a4ae0a8af464465bc27d44e4a
Signer #1 certificate MD5 digest: 8845af2fad3b535727b1b0ed63b00e43
Signer #1 key algorithm: RSA
Signer #1 key size (bits): 4096
Signer #1 public key SHA-256 digest: b255b671617884a9ab827a782f70d04491333599af33dfd5449367df154e286a
Signer #1 public key SHA-1 digest: 3e1ed768068912ec5cdce22f9c2e3ac25dd2eab2
Signer #1 public key MD5 digest: 1af143237d97328108a49e3d84968628
.... (output redacted for brevity)`} />
                <p>Let’s try to install the signed apps.</p>
                <BashCodeBlock code={`$ adb install app-first.apk 
Performing Streamed Install
Success
$ adb install app-second.apk
Performing Streamed Install
adb: failed to install app-second.apk: Failure [INSTALL_FAILED_UPDATE_INCOMPATIBLE: Package com.example.app signatures do not match previously installed version; ignoring!]`} />
                <p>This is usual. Both of the apps have same package identifiers and
                    different signatures. Android forbids update if signature mismatches.</p>
                <p><em>Android accepts the APK only if it proves the trust with older
                    signing keys. APK Signature Scheme v3 introduces the facility to do this.
                    With the <code>apksigner</code> utility, we have to rotate the key to
                    create a signing certificate lineage and sign the APK. It includes the
                    proof that the new key has a relationship to the old key.</em></p>
                <BashCodeBlock code={`$ apksigner rotate \\
> --old-signer --ks first.jks \\
> --new-signer --ks second.jks \\
> --out lineage-1-2         
Keystore password for old signer: ********
Keystore password for new signer: ********`} />
                <p>Now we sign the APK with the new signer <code>second.jks</code> keystore,
                    provided the old keystore <code>first.jks</code> and the signing certificate
                    lineage of the keystores.</p>
                <BashCodeBlock code={`$ apksigner sign \\
> --ks first.jks \\
> --next-signer --ks second.jks \\
> --lineage lineage-1-2 \\
> --in app-release-unsigned.apk \\
> --out app-rotated-1-2.apk
Keystore password for signer #1: ********
Keystore password for signer #2: ********`} />
                <p>All right. Let’s take a look on the signature of <code>app-rotated-1-2.apk</code></p>
                <BashCodeBlock code={`$ apksigner verify -v --print-certs app-rotated-1-2.apk
Verifies
Verified using v1 scheme (JAR signing): true
Verified using v2 scheme (APK Signature Scheme v2): true
Verified using v3 scheme (APK Signature Scheme v3): true
Number of signers: 1
Signer #1 certificate DN: CN=Second, OU=Example, O=Example, L=Example, ST=Example, C=IN
Signer #1 certificate SHA-256 digest: 1c7642f167f13281932c4d6f0df654217117ede891e529dc4cecb590ec92e365
Signer #1 certificate SHA-1 digest: 6581fe770a6a676a4ae0a8af464465bc27d44e4a
Signer #1 certificate MD5 digest: 8845af2fad3b535727b1b0ed63b00e43
Signer #1 key algorithm: RSA
Signer #1 key size (bits): 4096
Signer #1 public key SHA-256 digest: b255b671617884a9ab827a782f70d04491333599af33dfd5449367df154e286a
Signer #1 public key SHA-1 digest: 3e1ed768068912ec5cdce22f9c2e3ac25dd2eab2
Signer #1 public key MD5 digest: 1af143237d97328108a49e3d84968628
.... (output redacted for brevity)`} />
                <p>The signature looks exactly like from the <code>app-second.apk</code>. Let’s install over the <code>app-first.apk</code>.</p>
                <BashCodeBlock code={`$ adb install app-rotated-1-2.apk 
Performing Streamed Install
Success`} />
                <p>The rotated APK installs fine for the Androids before 9.0 Pie API 28.
                    For previous Androids, <code>-r</code> flag is necessary. It tells
                    the package manager to re-install the package. For Android Pie 9.0
                    and later, it is also possible to install <code>app-second.apk</code> after <code>app-rotated-1-2.apk</code>.
                    This is because the <code>app-rotated-1-2.apk</code> proves the new
                    signature belongs to the same developer, and further installations
                    will requires signing from the new keystore only.</p>
                <p>For the earlier versions of Android, the future updates will requires to
                    be signed with the previous keystore and the signing certificate lineage,
                    which invalidates the benefit of key rotation. I hope Google
                    will find a solution for that.</p>
                <h3 id="rotate-it-again">Rotate it again</h3>
                <p>What will have to do if you want to publish updates with a newer
                    keystore <code>third.jks</code>? Rotate it again, with older keystores
                    along the previous signing certificate lineage.</p>
                <BashCodeBlock code={`$ apksigner rotate \\
> --in lineage-1-2 \\
> --out lineage-1-2-3 \\
> --old-signer --ks second.jks \\
> --new-signer --ks third.jks
Keystore password for old signer: ********
Keystore password for new signer: ********`} />
                <p>This will generate a new signing certificate lineage, which proves
                    the <code>third.jks</code> keystore belongs to the family
                    of <code>first.jks</code> and <code>second.jks</code>.
                    Now sign with the latest keystore <code>third.jks</code>, previous
                    keystore <code>second.jks</code> and the latest signing certificate
                    lineage <code>lineage-1-2-3</code>.</p>
                <BashCodeBlock code={`$ apksigner sign \\
> --ks first.jks \\
> --next-signer --ks second.jks \\
> --next-signer --ks third.jks \\
> --lineage lineage-1-2-3 \\
> --in app-release-unsigned.apk \\
> --out app-rotated-2-3.apk
Keystore password for signer #1: ********
Keystore password for signer #2: ********
Keystore password for signer #3: ********`} />
                <p>The rotated APK will have signature by <code>third.jks</code> keystore,
                    but includes the proof that it can be verified
                    over <code>app-first.apk</code> and <code>app-second.apk</code>.</p>
                <BashCodeBlock code={`apksigner verify -v --print-certs app-rotated-2-3.apk 
Verifies
Verified using v1 scheme (JAR signing): true
Verified using v2 scheme (APK Signature Scheme v2): true
Verified using v3 scheme (APK Signature Scheme v3): true
Number of signers: 1
Signer #1 certificate DN: CN=Third, OU=Example, O=Example, L=Example, ST=Example, C=IN
Signer #1 certificate SHA-256 digest: 046b1a6ae24f12b2d7d2938d7054c06bac308c672981f1bea38d40afb9c23984
Signer #1 certificate SHA-1 digest: d3f77987a973960b360777a5c3f534eb57ee52e5
Signer #1 certificate MD5 digest: 688f275d697fe3630ad377d7ffa8d6e5
Signer #1 key algorithm: RSA
Signer #1 key size (bits): 4096
Signer #1 public key SHA-256 digest: 11f007348e9bc258207c58a819c3ffbde118d99c7f3ecf6fd6ec94db18f768a7
Signer #1 public key SHA-1 digest: aa6c269b71a495699aa6cf32aeae15377713754a
Signer #1 public key MD5 digest: a1c68cc9d3a02954d2ceeeef06f5b3c1
.... (output redacted for brevity)`} />
                <p>Finally, install over the <code>app-second.apk</code></p>
                <BashCodeBlock code={`$ adb install app-rotated-2-3.apk 
Performing Streamed Install
Success`} />
                <p>Yay! For Android 9.0 Pie or later, the further updates required to be
                    signed with the <code>third.jks</code> keystore only. But make sure
                    that you have to keep the signing certificate lineage forever, because
                    in case you have to use a new keystore, you will need it.</p>
                <BashCodeBlock code={`$ adb install app-third.apk 
Performing Streamed Install
Success`} />
                <h3 id="reference">Reference</h3>
                <ul>
                    <li><a href="https://source.android.com/security/apksigning/v3">APK Signature Scheme v3</a></li>
                    <li><a href="https://developer.android.com/about/versions/pie/android-9.0#apk-key-rotation">APK signature scheme with key rotation</a></li>
                    <li><a href="https://source.android.com/security/apksigning/v4">APK Signature Scheme v4</a></li>
                </ul>
            </Article>
            <RecentPosts excludeIndex={CONTENT_INDEX} /> 
        </Layout>
    )
}

export default ArticlePage

export const Head: HeadFC = () => <title>{content.title}</title>