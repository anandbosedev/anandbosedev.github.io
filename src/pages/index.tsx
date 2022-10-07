import * as React from "react"
import type { HeadFC } from "gatsby"
import Layout from "../components/Layout"
import IndexPaginator from "../components/IndexPaginator"

const IndexPage = () => {
  return (
    <Layout>
      <IndexPaginator/>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Anand's Blog</title>
