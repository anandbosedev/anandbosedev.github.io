import * as React from 'react'
import ButtonsContainer from '../components/ButtonsContainer'
import ShareButton from '../components/ShareButton'
import { FormatDate } from '../util/FormatDate'

type ArticleProps = {
    children?: React.ReactNode,
    title?: string,
    date?: string,
    shortDescription?: string,
}

type ArticleState = {
    href?: string,
}

class Article extends React.Component<ArticleProps, ArticleState> {

    constructor(props: ArticleProps) {
        super(props)
        this.state = {
            href: ''
        }
    }

    componentDidMount(): void {
        this.setState({ href: window.location.href })
    }

    render(): React.ReactNode {
        return (
            <main>
                <article className='post'>
                    <h2 className='post-title'>{ this.props.title }</h2>
                    <time dateTime={this.props.date} className='post-date'>{  (this.props.date != undefined) ? FormatDate(this.props.date!) : ''}</time>
                    <ButtonsContainer>
                        <ShareButton 
                            title={this.props.title} 
                            text={this.props.shortDescription} 
                            url={this.state.href}/>
                    </ButtonsContainer>
                    <p>{ this.props.shortDescription }</p>
                    { this.props.children }
                </article>
            </main>
        )
    }
}

export default Article