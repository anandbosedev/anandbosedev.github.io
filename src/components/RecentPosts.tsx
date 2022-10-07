import { Link } from 'gatsby'
import * as React from 'react'
import { Content, Contents } from '../Contents'
import { FormatDate } from '../util/FormatDate'

type RecentPostsProps = {
    excludeIndex?: number
}

const RecentPosts = ({ excludeIndex }: RecentPostsProps) => {
    var filteredList: ReadonlyArray<Content>
    if (excludeIndex !== undefined && excludeIndex >= 0 && excludeIndex < Contents.length) {
        const itemToExclude = Contents[excludeIndex]
        filteredList = Contents.filter(x => (x != itemToExclude))
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