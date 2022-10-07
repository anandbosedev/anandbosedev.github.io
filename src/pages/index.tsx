import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/Layout"
import { BashCodeBlock, KotlinCodeBlock } from "../components/CodeBlocks"
import ButtonsContainer from "../components/ButtonsContainer"
import ShareButton from "../components/ShareButton"

const IndexPage = () => {
  const code = `fun greetings() {
  print("Hello, world! Here's my code highlighting! Let's see how it works for longer lines too")
  val a = 10
  var b = 20
  val a = 10
  var b = 20
  val a = 10
  var b = 20
  val a = 10
  var b = 20
  val a = 10
  var b = 20
  val a = 10
  var b = 20
}`
  return (
    <Layout>
      <main>
        <h1>Hello, World!</h1>
        <ButtonsContainer>
          <ShareButton title="Hello" url="https://anandbose.dev/"/>
        </ButtonsContainer>
        <p>Welcome to my Gatsby blog!</p>
        <KotlinCodeBlock code={code} />
      </main>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
