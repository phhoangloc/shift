'use client'
import React, { useState, useEffect } from 'react'
import store from '../store'
import { setUser } from '../reducer/UserReduce'
import { UserAuthen } from '@/api/UserAuthen'
import "../../style/theme.css"
type Props = {
    children: React.ReactNode
}

const Provider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentRefresh, setCurrentRefresh] = useState<number>(store.getState().refresh)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentRefresh(store.getState().refresh))

    }
    useEffect(() => {
        update()
    })

    const [loading, setLoading] = useState<boolean>(true)
    const checkLogin = async () => {
        setLoading(true)
        const result = await UserAuthen.checkLogin()
        if (result.success) {
            store.dispatch(setUser(result.data))
            setLoading(false)
        } else {
            store.dispatch(setUser({}))
            setLoading(false)
        }
    }

    useEffect(() => {
        checkLogin()
    }, [currentRefresh])

    return (
        loading ? <p>loading...</p> : children
        // <div className={`admin ${currentTheme ? "light" : "dark"}`}>
        //     <div className="adminbody">
        //     </div>
        // </div>

    )
}

export default Provider