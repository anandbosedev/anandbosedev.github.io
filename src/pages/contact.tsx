import * as React from 'react'
import { HeadFC } from 'gatsby'
import Layout from '../components/Layout'

const Contact = () => {
    return (
        <Layout>
            <main>
                <h2 id="about-me">About me</h2>
                <p>Passionate programmer, tech enthusiast, dad, husband. Loves to hack, break and fix things!</p>
                <h2 id="contact">Contact</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>GitHub</td>
                            <td><a href="https://github.com/anandbosedev">@anandbosedev</a></td>
                        </tr>
                        <tr>
                            <td>Twitter</td>
                            <td><a href="https://twitter.com/anandbosedev">@anandbosedev</a></td>
                        </tr>
                        <tr>
                            <td>Mastodon</td>
                            <td><a href="https://mastodon.social/@anandbose">@anandbose@mastodon.social</a></td>
                        </tr>
                        <tr>
                            <td>LinkedIn</td>
                            <td><a href="https://www.linkedin.com/in/anandbosedev/">@anandbosedev</a></td>
                        </tr>
                    </tbody>
                </table>
                <p>Or, write to me directly to <a href="mailto:hello@anandbose.dev">hello@anandbose.dev</a></p>
                <h2 id="web-of-trust">Web of Trust</h2>
                <p>I recommend you to read the <a href="https://emailselfdefense.fsf.org/en/">Email Self Defense</a> chapter for understanding Public Key Encryption and let’s build a safer and trustworthy web for all of us.</p>
                <p>You are welcome to use my public GPG key to send encrypted emails to me. Don’t forget to send your public key so I can encrypt my replies!</p>
                <table>
                    <tbody>
                        <tr>
                            <td>GPG Key</td>
                            <td><a href="./gpg.txt" download={true}>Download</a></td>
                        </tr>
                        <tr>
                            <td>Fingerprint</td>
                            <td><code>F66A 54B3 4204 5717 748C  BC39 1EE0 DAEB 5654 697E</code></td>
                        </tr>
                    </tbody>
                </table>
            </main>
        </Layout>
    )
}

export default Contact
export const Head: HeadFC = () => <title>Contact</title>