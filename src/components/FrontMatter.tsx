import { Link } from 'gatsby'
import * as React from 'react'
import { Content } from '../Contents'
import { FormatDate } from '../util/FormatDate'

const FrontMatter = (key: any, content: Content) => {
    return (
        <article className="post" key={key}>
            <h2 className="post-title">
                <Link to={content.path}>{content.title}</Link>
            </h2>
            <time dateTime={content.date} className="post-date">{ FormatDate(content.date) }</time>
            <p>{content.shortDescription}</p>
        </article>
    )
}

export default FrontMatter