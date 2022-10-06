import React from "react"
import { Link } from "gatsby"

const Header = () => (
    <header className="masthead">
        <nav>
            <h1 className="masthead-title">
                <Link to="/" title="Home">Anand's Blog</Link>
            </h1>
            <div>
                <Link to="/archive">Archive</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </nav>
    </header>
)

export default Header