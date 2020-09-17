import React from "react"
import Sidebar from "./sidebar"

const Layout = props => {

    return (
        <div className="h-100">
            <section className="main-content columns is-fullheight">
                <Sidebar />

                <div className="container column">
                    <div className="section">

                        {props.children}

                    </div>
                </div>
            </section>
            <footer className="footer is-hidden">
                <div className="container">
                    <div className="content has-text-centered">
                        <p>Hello</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Layout