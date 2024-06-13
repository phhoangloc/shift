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
            <div>
                <h3>you havent logged in yet</h3>
                <Button name='Login' onClick={() => toPage.push("/login")} />
            </div>
    )
}

export default Authen