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
          <p>May be the link you typed has mistakes, or permanently removed from the server.</p>
        </aside>
      </main>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
