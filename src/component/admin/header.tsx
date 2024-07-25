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
import LogoutIcon from '@mui/icons-material/Logout';
import { setAlert } from '@/redux/reducer/alertReducer'
type Props = {}

const Header = (props: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<any>(store.getState().theme)
    const [currentMenu, setCurrentMenu] = useState<any>(store.getState().menu)
    const [currentAlert, setCurrentAlert] = useState<any>(store.getState().alert)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentMenu(store.getState().menu))
        store.subscribe(() => setCurrentAlert(store.getState().alert))

    }
    useEffect(() => {
        update()
    })

    const [isLogout, setIsLogout] = useState<boolean>(false)
    useEffect(() => {
        const logOut = (v: boolean, is: boolean) => {
            localStorage.clear()
            setIsLogout(false)
            store.dispatch(setAlert({ open: false, msg: "", value: false }))
            store.dispatch(setRefresh())
        }

        currentAlert.value && isLogout && logOut(currentAlert.value, isLogout)
        currentAlert.value === false && currentAlert.open === false && setIsLogout(false)

    }, [currentAlert.value, currentAlert.open, isLogout])

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
                <div style={{ position: "absolute", right: "25px", display: "flex" }}>
                    <p style={{ marginRight: "35px" }}>{currentUser?.username}</p>
                    <AccordionIcon
                        icon={<PersonIcon style={{ width: "25px", height: "25px", padding: "7.5px" }} />}
                        data={[
                            {
                                icon: <LogoutIcon style={{ width: "25px", height: "25px", padding: " 5px" }} />,
                                name: "ログアウト",
                                func: () => { setIsLogout(true); store.dispatch(setAlert({ open: true, msg: "本当にログアウトしますか?", value: false })) }
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