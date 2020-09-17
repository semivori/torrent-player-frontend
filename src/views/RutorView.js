import React, { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PlayFill, Trash, TrashFill } from "react-bootstrap-icons"
import SearchForm from "../components/forms/SearchForm"
import { rutor } from "../utils/torrentBackend"

const RutorView = props => {
    const [searchValue, setSearchValue] = useState()
    const [searchResults, setSearchResults] = useState()

    useEffect(() => {
        if (searchValue) {
            rutor.search(searchValue).then(res => {
                setSearchResults(res.data)
            })
        }

    }, [searchValue])

    const searchCallback = useCallback(value => {
        console.log(value);
        if (value && value.length > 1) {
            setSearchValue(value)
        }
    }, [setSearchValue])

    return (
        <div>
            <SearchForm callback={searchCallback} value={searchValue} />
            {searchResults && <ResultsTable data={searchResults} />}
            {!searchResults && <HistoryTable onItemClick={searchCallback} />}
        </div>
    )

}

const HistoryTable = props => {
    const { onItemClick } = props
    const [data, setData] = useState([])

    useEffect(() => {
        rutor.history().then(res => {
            setData(res.data)
        })
    }, [])

    const onDelClick = id => {
        rutor.delHistory(id).then(() => {
            rutor.history().then(res => {
                setData(res.data)
            })
        })
    }

    const tableItems = data.map((item, index) => {
        const date = new Date(item.date)
        return (
            <tr key={item.query}>
                <td>
                    {index + 1}
                </td>
                <td>
                    <button onClick={() => onItemClick(item.query)} className="button is-text">
                        {item.query}
                    </button>
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
                        <th className="has-text-white-bis">Query</th>
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

const ResultsTable = props => {
    const { data } = props

    const tableItems = data.map((item, index) => {
        const infoHash = encodeURIComponent(item.infoHash)
        const url = `/player/${infoHash}`

        return (
            <tr key={item.infoHash}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                    <Link to={url}>
                        <PlayFill size="24" />
                    </Link>
                </td>
                <td>{item.seeds}</td>
                <td>{item.leaches}</td>
                <td>{item.size}</td>
                <td>{item.date}</td>
            </tr>
        )
    })

    return (
        <div className="table-container mt-2">
            <table className="table is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr className="has-background-primary">
                        <th className="has-text-white-bis">#</th>
                        <th className="has-text-white-bis">Name</th>
                        <th className="has-text-white-bis">Magnet</th>
                        <th className="has-text-white-bis">S</th>
                        <th className="has-text-white-bis">L</th>
                        <th className="has-text-white-bis">Size</th>
                        <th className="has-text-white-bis">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </table>
        </div>
    )
}

export default RutorView