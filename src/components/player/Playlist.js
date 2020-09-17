import React, { useEffect, useState } from "react"
import { PlayFill } from "react-bootstrap-icons"
import { NavLink } from "react-router-dom"

const Playlist = props => {
    const { torrentInfo } = props
    const [files, setFiles] = useState(torrentInfo.files)
    const [filterValue, setFilterValue] = useState("")

    useEffect(() => {
        if (filterValue.length > 0) {
            setFiles(torrentInfo.files.filter(file => file.name.indexOf(filterValue.toLowerCase()) > -1))
        } else {
            setFiles(torrentInfo.files)
        }
    }, [filterValue])

    const links = files.map(file => {
        return (
            <NavLink key={file.name} to={`/player/${torrentInfo.infoHash}/${file.index}`} activeClassName="is-active" className="panel-block">
                <span className="panel-icon">
                    <PlayFill />
                </span>
                {file.name}
            </NavLink>
        )
    })

    const onSearchInput = e => {
        setFilterValue(e.target.value)
    }

    return (
        <nav className="panel is-link">
            <p className="panel-heading">
                {torrentInfo.name}
            </p>
            <div className="panel-block">
                <p className="control has-icons-left">
                    <input value={filterValue} onChange={onSearchInput} className="input" type="text" placeholder="Search" />
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                </p>
            </div>
            {links}
        </nav>
    )

    return (
        <aside className="menu">
            <ul className="menu-list">
                {links}
            </ul>
        </aside>
    )
}

export default Playlist