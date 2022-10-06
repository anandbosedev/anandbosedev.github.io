import * as React from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-kotlin.js'
import 'prismjs/components/prism-bash.js'

type Props = {
    code: string,
}
export const KotlinCodeBlock = (props: Props) => {
    const preRenderedCode = Prism.highlight(props.code, Prism.languages.kotlin, 'kotlin')
    return (
        <>
        <div className='highlight'>
            <pre className='highlight'>
                <code dangerouslySetInnerHTML={{ __html: preRenderedCode}} />
            </pre>
        </div>
        </>
    )
}


export const BashCodeBlock = (props: Props) => {
    const preRenderedCode = Prism.highlight(props.code, Prism.languages.bash, 'bash')
    return (
        <>
        <div className='highlight'>
            <pre className='highlight'>
                <code dangerouslySetInnerHTML={{ __html: preRenderedCode}} />
            </pre>
        </div>
        </>
    )
}