import * as React from 'react'
import Layout from '../../../components/Layout'
import Article from '../../../components/Article'

const ArticlePage = () => {
    return (
        <Layout>
            <Article
                title='Android Signing Key Rotation – Explained'
                date='08 May 2020'
                shortDescription='An experimentation of safely migrating signing keys for Android apps, without losing trust to the previous keys.'>

                <p>From the Android developer documentation:</p>
                <blockquote>
                    <p>
                        Android 9 (API level 28) supports APK key rotation, which gives apps the ability to change their signing key as part of an APK update. To make rotation practical, APKs must indicate levels of trust between the new and old signing key. To support key rotation, we updated the APK signature scheme from v2 to v3 to allow the new and old keys to be used. V3 adds information about the supported SDK versions and a proof-of-rotation struct to the APK signing block.
                    </p>
                </blockquote>
            </Article>
        </Layout>
    )
}

export default ArticlePage