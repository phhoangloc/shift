'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Button from '@/component/input/button'
type Props = {
    children: React.ReactNode
}

const Authen = ({ children }: Props) => {
    const toPage = useRouter()
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })

    return (
        currentUser?._id ?
            <div className={`admin ${currentTheme ? "light" : "dark"}`}>
                <div className="adminbody">
                    {children}
                </div>
            </div>
            :
            <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                <h3>まだログインしていません</h3>
                <div style={{ margin: "10px auto", color: "red" }}><Button name='ログイン' onClick={() => toPage.push("/login")} /></div>
                <p style={{ marginTop: "25px", cursor: "pointer", fontSize: "0.9rem" }} onClick={() => toPage.push("/signup")}>新規登録</p>

            </div>
    )
}

export default Authen