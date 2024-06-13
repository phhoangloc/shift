'use client'
import React, { useRef, useState } from 'react'
// import store from '@/redux/store'
// import { color } from '@/style/theme'
type Props = {
    onChange: (e: string) => void,
    name: React.ReactNode,
    value: string,
    type?: string,
    onfocus?: () => void,
    disabled?: boolean,
    warn?: string
}

const Input = ({ onChange, name, value, type, onfocus, disabled, warn }: Props) => {

    const [focus, setFocus] = useState<boolean>(false)

    const box: React.CSSProperties = {
        position: "relative",
        width: "100%",
        height: "50px",
        borderRadius: "5px",
        transition: "all 0.5s",
        boxShadow: "0px 0px 2px  #888",
        margin: "10px 0"

    }
    const boxFocus: React.CSSProperties = {
        padding: "15px 0 0 5px",
        boxShadow: "0px 0px 5px  #888",

    }
    const title: React.CSSProperties = {
        position: "absolute",
        top: "0px",
        left: "0px",
        padding: "0 5px",
        // background: color.main,
        // color: "white",
        fontSize: "15px",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
        height: "50px",
        lineHeight: "50px",
        transition: "all 0.5s"
    }

    const titleFocus: React.CSSProperties = {
        top: 0,
        height: "20px",
        lineHeight: "20px",
        borderBottomLeftRadius: "0px",
        borderTopRightRadius: "5px",
        fontSize: "13px",
        opacity: 0.5
    }

    const inputBox: React.CSSProperties = {
        width: "100%",
        height: "100%",
        border: "none",
        padding: "0px 5px 0",
        background: "inherit",
        fontSize: "0.9rem",
        color: "inherit",
        transition: "all 0.5s",
        boxSizing: "border-box",
    }

    const inputBoxForcus: React.CSSProperties = {
        height: "30px",
    }

    return (
        <div style={focus || value ? { ...box, ...boxFocus } : { ...box }}>
            <p style={focus || value ? { ...title, ...titleFocus } : { ...title }}>{name}<span style={{ margin: "0 5px", fontSize: "60%", color: "red", fontWeight: "bold" }}>{warn ? warn : ""}</span></p>
            <input
                style={focus || value ? { ...inputBox, ...inputBoxForcus } : { ...inputBox }}
                disabled={disabled ? disabled : false}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={(e) => { setFocus(true); onfocus && onfocus(); e.target.style.outline = 'none'; }}
                onBlur={() => setFocus(false)}
                type={type}
            ></input>
        </div >
    )
}

export default Input