'use client'
import React, { useState, useEffect } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import store from '@/redux/store';
type Props = {
    icon: React.ReactNode
    data?: any[],
    top?: string
    right?: string
}

const AccordionIcon = ({ icon, data, top, right }: Props) => {

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
    return (
        <div style={{ position: "absolute", top: top, right: right }}>
            <div className='grid_box' style={{ height: "40px", lineHeight: "40px" }}>
                <div style={{ width: `40px)`, cursor: "pointer" }} onClick={() => setOpen(!open)}>{icon}</div>
            </div>
            <div className={`${currentTheme ? "light1" : "dark1"} ` + 'transition-all-05s overflow-hidden box-shadow-2'}
                style={{ position: 'absolute', top: "40px", right: 0, width: "max-content", zIndex: 1, borderRadius: "5px", padding: "2px", display: open ? "block" : "none" }}>
                {
                    data ? data.map((item: any, index: number) =>
                        item.link ?
                            <Link href={item.link} key={index}>
                                <div className='hover-title' key={index}
                                    style={{ height: "40px", lineHeight: "40px", fontSize: "0.9rem", padding: "0px 15px", cursor: "pointer", opacity: 0.75, borderRadius: "5px", fontWeight: "bold" }}>
                                    {item.name}
                                </div>
                            </Link> :
                            <div className='hover-title' key={index} onClick={() => { item?.func(), setOpen(false) }}
                                style={{ height: "40px", lineHeight: "40px", fontSize: "0.9rem", padding: "0px 15px", cursor: "pointer", opacity: 0.75, borderRadius: "5px", fontWeight: "bold" }}>
                                {item.name}
                            </div>
                    ) : null
                }
            </div>
        </div>
    )
}

export default AccordionIcon