"use client"
// import { color } from '@/style/theme'
import React from 'react'
type Props = {
    onClick: () => void,
    name: string,
    disable?: boolean
}

const Button = ({ onClick, name, disable }: Props) => {
    return (
        <div style={{
            width: "100px", height: "40px", margin: "5px", borderRadius: "5px",
            boxShadow: disable ? "none" : "1px 1px 5px  #888",
            border: disable ? "1px solid #aaa" : "",
            color: disable ? "lightgrey" : "inherit",
            cursor: disable ? "unset" : "pointer"
        }}>
            <button
                style={{ width: "100%", height: "100%", fontSize: "1rem", background: "none", border: "none", color: "inherit", cursor: "inherit", fontWeight: "bold" }}
                disabled={disable ? disable : false}
                onClick={() => onClick()}
            >
                {name}
            </button>
        </div>
    )
}

export default Button