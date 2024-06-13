'use client'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import FeedIcon from '@mui/icons-material/Feed';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EmailIcon from '@mui/icons-material/Email';
import { setMenu } from '@/redux/reducer/MenuReduce';
import store from '@/redux/store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
type Props = {}

const Menu = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))

    }
    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const menus = [
        {
            icon: <DashboardIcon />,
            name: "ダッシュボード",
            link: "/"
        },
        {
            icon: <DescriptionIcon />,
            name: "固定ページ",
            link: "fpage"
        },
        {
            icon: <FeedIcon />,
            name: "ニュース",
            link: "/news"
        },
        {
            icon: <EmailIcon />,
            name: "メール",
            link: "/mails"
        },
    ]

    return (
        <div className={`menubackground ${currentMenu ? "menubackgroundOn" : "menuBackgroundOff"}`}>
            <div className={`menu ${currentMenu ? "menuOn" : ""}  ${currentTheme ? "light1" : "dark1"}`}>
                <div className='iconClose'><CloseIcon onClick={() => store.dispatch(setMenu(false))} /></div>
                {menus.map((menu: any, index: number) => <div key={index} className='item' onClick={() => { toPage.push("/admin/" + menu.link), store.dispatch(setMenu(false)) }}>
                    <div className='icon'>{menu.icon}</div>
                    <p>{menu.name}</p>
                </div>)}
            </div>
        </div>
    )
}

export default Menu