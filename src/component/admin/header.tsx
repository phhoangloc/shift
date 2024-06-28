'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import Image from 'next/image'
import IconToggle from '../tool/iconToggle'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccordionIcon from '../tool/accordionIcon';
import PersonIcon from '@mui/icons-material/Person';
import { setRefresh } from '@/redux/reducer/RefreshReduce';
import { setTheme } from '@/redux/reducer/ThemeReduce';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { setMenu } from '@/redux/reducer/MenuReduce'
import Link from 'next/link'
type Props = {}

const Header = (props: Props) => {
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

    console.log(currentUser?._id)

    return (
        <div className='header'>
            <IconToggle
                className='iconSwitch'
                icon1={<DarkModeIcon onClick={() => store.dispatch(setTheme(false))} />}
                icon2={<LightModeIcon onClick={() => store.dispatch(setTheme(true))} />}
                value={currentTheme} />
            <IconToggle
                className='iconSwitch iconMenu'
                icon1={<CloseIcon onClick={() => store.dispatch(setMenu(false))} />}
                icon2={<MenuIcon onClick={() => store.dispatch(setMenu(true))} />}
                value={currentMenu} />

            {currentUser?._id ?
                <div style={{ position: "absolute", right: "25px", width: "100px" }}>
                    <p>{currentUser?.username}</p>
                    <AccordionIcon
                        icon={<PersonIcon style={{ width: "25px", height: "25px", padding: "7.5px" }} />}
                        data={[
                            {
                                name: "ログアウト",
                                func: () => localStorage.clear()
                            }
                        ]}
                        top="5px"
                        right='0px' />
                </div>
                : null
            }
            <Link href={"/"} target='_blank' ><h3>SHIFT</h3></Link>

        </div>
    )
}

export default Header