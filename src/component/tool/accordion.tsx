'use client'
import React, { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import store from '@/redux/store';
type Props = {
    title: string
    data: any[]
    width: string
}

const Accordion = ({ title, data, width }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })

    const [open, setOpen] = useState<boolean>(false)

    const clickBox: React.CSSProperties = {
        display: "flex",
        height: "40px",
        lineHeight: "40px",
        cursor: "pointer",
        boxShadow: "0px 0px 2px  #888",
        borderRadius: "5px",
        padding: "0 5px",
        margin: "10px 0"
    }

    const iconStyle: React.CSSProperties = {
        width: "30px", height: "30px", padding: "5px",
    }

    const selectBox: React.CSSProperties = {
        width: "calc(100%)",
        borderRadius: "5px",
        boxShadow: "0px 0px 2px #444 ",
        position: "absolute",
        top: "45px",
        overflow: "hidden",
        transition: "all 0.25s",
        height: `${open ? data?.length * 40 + "px" : 0}`,
        zIndex: 2,
        background: "white"
    }

    const selectTitle: React.CSSProperties = {
        height: "40px",
        lineHeight: "40px",
        padding: "0 5px",
        cursor: "pointer",
        borderRadius: "5px",
    }
    return (
        <div style={{ position: "relative", width: width }}>
            <div style={clickBox} onClick={() => setOpen(!open)} >
                <h4>{title}</h4>
                {open ?
                    <KeyboardArrowUpIcon style={iconStyle} />
                    : <KeyboardArrowDownIcon style={iconStyle} />}
            </div>
            <div className={`${currentTheme ? "light" : "dark"}`} style={selectBox}>
                {
                    data ? data.map((item: any, index: number) =>
                        item.link ?
                            <Link href={item.link}
                                key={index}>
                                <div className='box_hover'
                                    style={selectTitle}>
                                    {item.name}
                                </div>
                            </Link> :
                            <div key={index} onClick={() => { item.func && item.func(), setOpen(false) }}
                                className='box_hover'
                                style={selectTitle}>
                                {item.name}</div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default Accordion