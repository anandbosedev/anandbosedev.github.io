import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/Layout"
import { BashCodeBlock, KotlinCodeBlock } from "../components/CodeBlocks"

const IndexPage = () => {
  const code = `fun greetings() {
  print("Hello, world! Here's my code highlighting!")
  val a = 10
  var b = 20
}`
  return (
    <Layout>
      <main>
        <h1>Hello, World!</h1>
        <p>Welcome to my Gatsby blog!</p>
        <KotlinCodeBlock code={code} />
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
