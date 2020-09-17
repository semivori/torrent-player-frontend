import React, { useEffect, useState } from "react"
import { PlayFill, TrashFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import { player } from "../../utils/torrentBackend"

const PlayerHistory = props => {
    const [data, setData] = useState([])

    useEffect(() => {
        player.history().then(res => {
            setData(res.data)
        })
    }, [])

    const onDelClick = _id => {

    }

    const tableItems = data.map((item, index) => {
        const date = new Date(item.date)
        const file = item.file
        const min = parseInt(item.time / 60, 10)
        const sec = parseInt(item.time - min * 60)

        return (
            <tr key={item._id}>
                <td>
                    {index + 1}
                </td>
                <td>
                    <Link to={`/player/${file.infoHash}/${file.index}`} className="button is-small is-link" >
                        <PlayFill /> {file.name}
                    </Link>
                </td>
                <td>
                    {min}:{sec}
                </td>
                <td>
                    {`${date.getDate()}.${date.getMonth() + 1}.${date.getUTCFullYear().toString()}`}
                </td>
                <td>
                    <button onClick={() => onDelClick(item._id)} className="button is-small is-danger">
                        <TrashFill size="18" />
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <div className="table-container mt-2">
            <table className="table is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr className="has-background-primary">
                        <th className="has-text-white-bis">#</th>
                        <th className="has-text-white-bis">Nane</th>
                        <th className="has-text-white-bis">Time</th>
                        <th className="has-text-white-bis">Date</th>
                        <th className="has-text-white-bis"></th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </table>
        </div>
    )
}

export default PlayerHistory
