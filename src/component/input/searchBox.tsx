import React, { useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
type Props = {
    placehoder: string,
    func: (v: string) => void,
    right?: string
}

const SearchBox = ({ placehoder, func, right }: Props) => {

    const inputRef = useRef<any>("")
    const boxStyle: React.CSSProperties = {
        display: "flex",
        height: "40px",
        position: "relative",
        fontSize: "1rem",
        margin: "0 0 0 auto",
        right: right || 0
    }
    const inputStyle: React.CSSProperties = { width: 0, margin: 0, padding: 0, border: 0, background: "inherit", transition: "all 0.25s", borderRadius: "5px" }
    const inputFocusStyle: React.CSSProperties = { width: "200px", border: "1px solid #aaa", padding: "0 5px" }

    const [isSeaching, setIsSearching] = useState<boolean>(false)
    return (
        <div style={boxStyle}>
            <input
                ref={inputRef}
                type="text"
                placeholder={placehoder}
                style={isSeaching ? { ...inputStyle, ...inputFocusStyle } : { ...inputStyle }}
                onFocus={(e) => e.target.style.outline = 'none'}
                onChange={(e) => {
                    func(e.target.value)
                }}
            />
            <SearchIcon onClick={() => { setIsSearching(!isSeaching), inputRef.current.focus() }} style={{ width: "30px", height: "30px", padding: "0px", boxSizing: "border-box", margin: "5px", cursor: "pointer" }} />
        </div>
    )
}

export default SearchBox