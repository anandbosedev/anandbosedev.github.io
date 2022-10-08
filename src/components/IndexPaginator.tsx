import * as React from "react"
import { Content, Contents } from "../Contents"
import FrontMatter from "./FrontMatter"
import PageController from "./PageController"

const ITEMS_PER_PAGE = 5


type IndexPageState = {
    contents: Array<Content>,
    currentPage: number,
    lastPage: number,
}

class IndexPaginator extends React.Component<{}, IndexPageState> {
    constructor(props: any) {
        super(props)
        this.state = this.buildStateForPage(0)
    }

    onForward(): void {
        const currentPage = this.state.currentPage
        if (currentPage > 0) {
            this.setState(this.buildStateForPage(currentPage - 1))
        }
    }

    onBack(): void {
        const currentPage = this.state.currentPage
        if (currentPage < this.state.lastPage) {
            this.setState(this.buildStateForPage(currentPage + 1))
        }
    }

    buildStateForPage(page: number): IndexPageState {
        const sortedContents = Array.from(Contents).sort((a, b) => (a.date <= b.date) ? 1 : -1)
        const totalItems = sortedContents.length
        const lastPage = Math.floor(totalItems / ITEMS_PER_PAGE)
        const startIndex = page * ITEMS_PER_PAGE
        const contents = sortedContents.slice(startIndex, startIndex + ITEMS_PER_PAGE)
        return ({ contents, currentPage: page, lastPage })
    }

    render(): React.ReactNode {
        return (
            <main>
                <div className="posts">
                    {this.state.contents.map(content => FrontMatter(Contents.indexOf(content), content))}
                </div>
                <PageController
                    canGoBack={this.state.currentPage > 0}
                    canGoForward={this.state.currentPage < this.state.lastPage}
                    onBack={this.onBack.bind(this)}
                    onForward={this.onForward.bind(this)} />
            </main>
        )
    }
}

export default IndexPaginator