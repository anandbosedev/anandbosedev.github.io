import * as React from 'react'
import { GatsbyBrowser } from 'gatsby'
import './styles/styles.scss'

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element }) => {
    return <>{element}</>
}