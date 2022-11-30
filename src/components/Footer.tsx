import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const FooterFirstLineStyle: React.CSSProperties = {
  marginTop: '1em'
}

const Footer = () => (
    <footer className="footer">
        <StaticImage alt="Anand Bose" width={100} height={100} src='../images/avatar.jpg' imgClassName="avatar" />
        <small style={FooterFirstLineStyle}>Hi there! I am Anand Bose.</small>
        <small>👨🏻‍💻📲</small>
        <small>Feel free to follow me on <a href="https://twitter.com/anandbosedev">Twitter</a> / <a rel="me" href="https://mastodon.social/@anandbose">Mastodon</a> / <a href="https://github.com/anandbosedev">GitHub</a>.</small>
        <small>
          Anand Bose © <time dateTime="2022-10-03T13:58:50+00:00">2022</time>. All rights reserved.
        </small>
      </footer>
)

export default Footer