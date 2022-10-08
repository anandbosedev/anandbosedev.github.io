import { Link } from 'gatsby'
import * as React from 'react'
import { Content, Contents } from '../Contents'
import { FormatDate } from '../util/FormatDate'

type RecentPostsProps = {
    excludeContentPath?: string
}

const RecentPosts = ({ excludeContentPath }: RecentPostsProps) => {
    var filteredList: ReadonlyArray<Content>
    if (excludeContentPath !== undefined) {
        filteredList = Contents.filter(content => content.path != excludeContentPath)
    } else {
        filteredList = Contents
    }
    const slicedList = filteredList.slice(0, 3)
    return (
        <aside className='related'>
            <h3>Recent Posts</h3>
            <ul className='related-posts'>
                {slicedList.map(content => (
                    <li>
                        <Link to={content.path}>{content.title} <small><time dateTime={content.date}>{FormatDate(content.date)}</time></small></Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default RecentPosts