import React from "react"
import { Link, NavLink, useRouteMatch } from "react-router-dom"
import { ArrowsAngleContract, HouseFill } from "react-bootstrap-icons"

const routes = [
    {
        path: "/",
        exact: true,
        label: "Home",
        icon: <HouseFill />,
    },
    {
        path: "/rutor",
        exact: false,
        label: "Rutor",
        icon: <ArrowsAngleContract />,
    },
]

const Sidebar = () => {

    return (
        <aside className="column is-narrow is-fullheight section is-hidden-mobile">
            <p className="menu-label is-hidden-touch">Navigation</p>
            <ul className="menu-list">
                {routes.map((route, index) => (
                    <li key={index}>
                        <NavLink
                            exact={true}
                            to={route.path}
                            activeClassName="is-active"
                        >
                            <span className="icon">{route.icon}</span> {route.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default Sidebar