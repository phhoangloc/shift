'use client'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
// import store from '@/redux/store'
// import { color } from '@/style/theme';

type Props = {
    onChange: (e: string) => void,
    onFocus?: () => void,
    name: string,
    value: string,
    n: number
}

const TextArea = ({ name, onChange, value, n, onFocus }: Props) => {

    // const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    // const update = () => {
    //     store.subscribe(() => setCurrentTheme(store.getState().theme))
    // }
    // update()

    const inputRef = useRef<any>()

    const [focus, setFocus] = useState<boolean>(false)

    useEffect(() => {
        inputRef.current ? inputRef.current.innerHTML = `${value}` : null
    }, [n])

    const box: React.CSSProperties = {
        position: "relative",
        width: "100%",
        height: "50px",
        borderRadius: "5px",
        margin: "0 0 10px",
        boxShadow: "0px 0px 3px  #888",
        transition: "all 0.5s",

    }
    const boxFocus: React.CSSProperties = {
        padding: "25px 0 10px 5px",
        boxShadow: "1px 1px 5px  #888",
        height: "100px"
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
        transition: "all 0.5s",

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
        // background: currentTheme ? color.background_light : color.background_dark,
        fontSize: "0.9rem",
        // color: currentTheme ? color.main : color.background_light,
        transition: "all 0.5s",
        boxSizing: "border-box",
    }

    const inputBoxForcus: React.CSSProperties = {
        height: "100%",
        // border: `2px solid ${color.main}`,
        overflow: "auto"
    }

    return (
        <div style={focus || value ? { ...box, ...boxFocus } : { ...box }}>
            <p style={focus || value ? { ...title, ...titleFocus } : { ...title }}>{name}</p>
            <div style={focus || value ? { ...inputBox, ...inputBoxForcus } : { ...inputBox }} ref={inputRef}
                contentEditable={true}
                onInput={(e) => onChange(e.currentTarget.innerHTML)}
                onFocus={(e) => { setFocus(true), e.target.style.outline = 'none'; onFocus && onFocus() }}
                onBlur={() => setFocus(false)}
            >
            </div>
        </div>
    )
}

export default TextArea