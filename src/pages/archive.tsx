import * as React from 'react'
import { HeadFC } from 'gatsby'
import Layout from '../components/Layout'
import { Contents, Content } from '../Contents'
import { Months } from '../util/FormatDate'
import { Link } from 'gatsby'

const ArchivePage = () => {
    const groupedContents = new Map<string, Array<Content>>()

    Contents.forEach(content => {
        const date = new Date(content.date)
        const monthAndYear = `${Months[date.getMonth()]} ${date.getFullYear()}`
        const array = groupedContents.has(monthAndYear) ? groupedContents.get(monthAndYear)! : new Array<Content>()
        array.push(content)
        groupedContents.set(monthAndYear, array)
    })

    return (
        <Layout>
            <main>
                <h1 id="archive">Archive</h1>
                <p>Browse all posts by month and year.</p>
                { Array.from(groupedContents.keys()).map(monthAndYear => (
                    <React.Fragment key={monthAndYear}>
                        <h2>{monthAndYear}</h2>
                        <ul>
                            { groupedContents.get(monthAndYear)?.map(content => (
                                <li key={content.path}><Link to={content.path}>{content.title}</Link></li>
                            )) }
                        </ul>
                    </React.Fragment>
                )) }
            </main>
        </Layout>
    )
}

export default ArchivePage

export const Head: HeadFC = () => <title>Archive</title>