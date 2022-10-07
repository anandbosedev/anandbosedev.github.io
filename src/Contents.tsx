export type Content = {
    title: string,
    shortDescription: string,
    date: string,
    path: string,
    category: string,
}

export const Contents: ReadonlyArray<Content> = [
    {
        title: 'Android Signing Key Rotation – Explained',
        shortDescription: 'An experimentation of safely migrating signing keys for Android apps, without losing trust to the previous keys.',
        date: '2020-05-08',
        path: '/posts/android-signing-key-rotation-explained',
        category: 'Android Development'
    },
    {
        title: 'The learning curve of the app development challenge',
        shortDescription: 'The story of choices and challenges that led the development of a visually aesthetic weather app “Q Weather”.',
        date: '2019-06-18',
        path: '/posts/the-learning-curve-app-development',
        category: 'Android Development'
    },
    {
        title: 'Continuous Integration for your Android project with BitBucket Pipelines',
        shortDescription: 'Utilizing BitBucket Pipelines to automatically build your Android project',
        date: '2019-05-16',
        path: '/posts/ci-with-bitbucket-pipelines',
        category: 'Continuous Integration'
    },
    {
        title: 'Bye bye JSON! Welcome Protocol Buffers!',
        shortDescription: 'Protocol Buffers -- A new, platform agnostic binary data serialization and deserialization library that makes you to say good-bye to JSON',
        date: '2018-08-06',
        path: '/posts/welcome-protocol-buffers',
        category: 'Networking'
    }
]