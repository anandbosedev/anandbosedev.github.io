import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/Layout"

const IndexPage = () => {
  return (
    <Layout>
      <main>
        <h1>Hello, World!</h1>
        <p>Welcome to my Gatsby blog!</p>
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
