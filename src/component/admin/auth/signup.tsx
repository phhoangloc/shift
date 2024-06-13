'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Input from '@/component/input/input'
import Button from '@/component/input/button'
import NoUser from '@/api/noUser'

type Props = {
    archive: string
}
const Signup = ({ archive }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }
    update()

    const toPage = useRouter()
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [isError, setIsErrors] = useState<boolean>(true)

    const [Error, setErrors] = useState<{ username?: string, password?: string, email?: string }>({})

    useEffect(() => {
        validateForm && validateForm();
    }, [username, password, email]);

    const validateForm = async () => {
        let errors: { username?: string, password?: string, email?: string } = {}

        if (username.length != 0 && 6 > username.length) {
            errors.username = `username's lenght is smallest 6 `

        }
        if (username) {
            const isusername = await fetch("/api/checkuser?username=" + username)
                .then((res) => res.json())
                .then((data) => data)
            if (isusername) { errors.username = "username is existed" }
        }
        if (!/\S+@\S+\.\S+/.test(email) && email.length != 0) {
            errors.email = 'email is not valid';
        }
        if (email) {
            const isEmail = await fetch("/api/checkuser?email=" + email)
                .then((res) => res.json())
                .then((data) => data)
            if (isEmail) { errors.email = "email is existed" }
        }
        if (password.length != 0 && password.length < 6) {
            errors.password = `password's lenght is smallest 6`;
        }

        setIsErrors(Object.keys(errors).length || username === "" || password === "" || email === "" ? true : false);
        setErrors(errors)
    }
    const signup = async (body: { username: string, password: string, email: string }) => {
        const result = await NoUser.signup(body)
        console.log(result)
        if (result.success) {
            setUsername("")
            setPassword("")
            setEmail("")
            // alert(result.data.msg)
            toPage.push("/admin/login")
        } else {
            alert(result.data.msg)
        }
    }

    return (
        <div style={{ width: "90%", maxWidth: "375px", margin: "auto", padding: "5%", boxShadow: "0px 0px 3px #aaa", borderRadius: "5px" }}>
            <h3>Sign Up</h3>
            <Input name='username' value={username} onChange={(data) => setUsername(data)} />
            <p style={{ fontSize: "0.6rem", color: "red" }}>{Error.username}</p>
            <Input type='password' name='password' value={password} onChange={(data) => setPassword(data)} />
            <p style={{ fontSize: "0.6rem", color: "red" }}>{Error.password}</p>
            <Input name='email' value={email} onChange={(data) => setEmail(data)} />
            <p style={{ fontSize: "0.6rem", color: "red" }}>{Error.email}</p>
            <div style={{ width: "max-content", margin: "20px auto 20px" }}><Button onClick={() => signup({ username, password, email })} name="Sign up" disable={isError} /></div>
            <p style={{ cursor: "pointer", fontSize: "0.9rem" }} className='link' onClick={() => toPage.push("/login")}>log in</p>
        </div>
    )
}

export default Signup