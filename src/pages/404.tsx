import * as React from "react"
import { Link, HeadFC } from "gatsby"
import Layout from "../components/Layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <main>
        <h1>404 Not Found</h1>
        <p>Sorry, the page you requested not found in the server.</p>
        <aside className="related">
          <p>I am migrating the blog from Jekyll to Gatsby, and rewriting them entirely in React. Some pages are <i>still</i> left to migrate. Please stay tuned.</p>
        </aside>
      </main>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
