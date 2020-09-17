import React, { useEffect, useState } from "react"
import { Search } from "react-bootstrap-icons"

const SearchForm = props => {
    const { callback, value: propsValue } = props
    const [value, setValue] = useState("")

    useEffect(() => {
        if (propsValue) {
            setValue(propsValue)
        }
    }, [propsValue])

    const onChange = e => {
        setValue(e.target.value)
    }

    const onKeyDown = e => {
        if (e.key === 'Enter') {
            submit()
        }
    }

    const submit = () => {
        callback(value)
    }

    return (
        <div>
            <div className="field is-grouped">
                <p className="control is-expanded">
                    <input value={value} onChange={onChange} onKeyDown={onKeyDown} className="input is-fullwidth" type="text" placeholder="Search..." />
                </p>
                <p className="control">
                    <button onClick={submit} className="button is-primary">
                        <Search />
                    </button>
                </p>
            </div>
        </div>
    )
}

export default SearchForm