import React from 'react'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
    children?: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
    <div className='container content'>
        <Header/>
        {children}
        <Footer/>
    </div>
)

export default Layout