import * as React from 'react'
import Layout from '../components/Layout'
import { HeadFC } from 'gatsby'
import { Content, Contents} from '../Contents'
import { Link } from 'gatsby'

const Categories = () => {
    const groupedContents = new Map<string, Array<Content>>()
    Contents.forEach(content => {
        const array = groupedContents.has(content.category) ? groupedContents.get(content.category)! : new Array<Content>()
        array.push(content)
        groupedContents.set(content.category, array)
    })
    return (
        <Layout>
            <main>
                <h1 id="categories">Categories</h1>
                <p>Browse all posts by categories.</p>
                { Array.from(groupedContents.keys()).map(category => (
                    <React.Fragment key={category}>
                        <h2>{category}</h2>
                        <ul>
                            { groupedContents.get(category)?.map(content => (
                                <li key={content.path}><Link to={content.path}>{content.title}</Link></li>
                            ))}
                        </ul>
                    </React.Fragment>
                ))}
            </main>
        </Layout>
    )
}

export default Categories
export const Head: HeadFC = () => <title>Categories</title>