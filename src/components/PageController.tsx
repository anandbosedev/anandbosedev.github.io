import { Link } from 'gatsby'
import * as React from 'react'

type PageControllerProps = {
    canGoBack: boolean,
    canGoForward: boolean,
    onBack: () => void,
    onForward: () => void,
}

const PageController = ({ canGoBack = false, canGoForward = false, onBack, onForward}: PageControllerProps) => {
    return (
        <div className="pagination">
            { (canGoForward) ? (<a className="pagination-item older" onClick={onBack}>Older</a>) : (<span className="pagination-item older">Older</span>) }
            { (canGoBack) ? (<a className="pagination-item newer" onClick={onForward}>Newer</a>) : (<span className="pagination-item newer">Newer</span>)}
        </div>
    )
}

export default PageController