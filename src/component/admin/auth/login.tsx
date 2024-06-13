'use client'
import React, { useEffect, useState } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'

import Input from '@/component/input/input'
import Button from '@/component/input/button'

import NoUser from '@/api/noUser'
import { setRefresh } from '@/redux/reducer/RefreshReduce'

type Props = {
    archive: string
}
const Login = ({ archive }: Props) => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const login = async (data: { username: string, password: string }) => {
        const result = await NoUser.login(data)

        if (result.success) {
            // store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            // setTimeout(() => {
            //     store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            // }, 3000)
            localStorage.token = "bearer " + result.result
            store.dispatch(setRefresh())
            toPage.push("/" + archive)
        } else {
            // store.dispatch(setNotice({ success: result.success, msg: result.message, open: true }))
            // setTimeout(() => {
            //     store.dispatch(setNotice({ success: result.success, msg: "", open: false }))
            // }, 3000)
        }
    }

    return (
        <div style={{ width: "90%", maxWidth: "375px", margin: "auto", padding: "5%", boxShadow: "0px 0px 3px #aaa", borderRadius: "5px" }}>
            <h2>Log In</h2>
            <Input name="username" value={username} onChange={(e => setUsername(e))} />
            <Input name="password" type='password' value={password} onChange={(e => setPassword(e))} />
            <div style={{ width: "max-content", margin: "20px auto" }}><Button name="Log In" onClick={() => login({ username, password })} /></div>
            <p style={{ cursor: "pointer", fontSize: "0.9rem" }} onClick={() => toPage.push("/signup")}>sign up</p>

        </div>
    )
}

export default Login