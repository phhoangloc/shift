'use client'
import Button from '@/component/input/button'
import Input from '@/component/input/input'
import TextArea from '@/component/input/textarea'
import React, { useEffect, useState } from 'react'
import NoUser from '@/api/noUser'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import store from '@/redux/store'
import Accordion from '@/component/tool/accordion'
import { error } from 'console'
import { setAlert } from '@/redux/reducer/alertReducer'
import { setNotice } from '@/redux/reducer/noticeReducer'
type Props = {}

const Contact = (props: Props) => {

    const [currentAlert, setCurrentAlert] = useState<any>(store.getState().alert)
    const update = () => {
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }
    useEffect(() => {
        update()
    })

    const [n, setN] = useState<number>(0)
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [emailRe, setEmailRe] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [request, setRequest] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const [isError, setIsErrors] = useState<boolean>(true)

    const [Error, setErrors] = useState<{ name?: string, email?: string, emailre?: string, title?: string, content?: string }>({})

    const body = {
        name,
        email,
        phone,
        request,
        content,
        title,
        slug: email + title
    }
    const sendEmailFromContact = async (isError: boolean, body: any) => {
        const result = isError ? { success: false } : await NoUser.createMail(body)
        if (result.success) {
            setName("")
            setEmail("")
            setPhone("")
            setTitle("")
            setContent("")
            setN(n + 1)
            alert("問い合わせを送信しました。")
        } else {
            alert(
                Error.name ||
                Error.email ||
                Error.emailre ||
                Error.title ||
                Error.content
            )
        }
    }

    useEffect(() => {
        if (currentAlert?.value) {
            sendEmailFromContact(isError, body)
            store.dispatch(setAlert({ value: false, open: false, msg: "" }))
        }
    }, [currentAlert?.value])

    const validateForm = async () => {
        let errors: { name?: string, email?: string, emailre?: string, title?: string, content?: string } = {}
        if (name.length === 0) {
            errors.name = `名前を入力する必要があります`
        }
        if (email.length === 0) {
            errors.email = `eメールを入力する必要があります`
        }
        if (emailRe.length === 0) {
            errors.emailre = `eメールを入力する必要があります`
        }
        if (title.length === 0) {
            errors.title = `タイトルを入力する必要があります`
        }
        if (content.length === 0) {
            errors.content = `内容を入力する必要があります`
        }
        if (!/\S+@\S+\.\S+/.test(email) && email.length != 0) {
            errors.email = '電子メールの無効化';
        }
        if (!/\S+@\S+\.\S+/.test(emailRe) && email.length != 0) {
            errors.emailre = '電子メールの無効化';
        }
        if (emailRe !== email) {
            errors.emailre = "電子メールは上記の電子メールと異なります "
        }
        setIsErrors(Object.keys(errors).length || email === "" || emailRe === "" ? true : false);
        setErrors(errors)
    }

    useEffect(() => {
        validateForm()
    }, [name, email, emailRe, title, content])

    return (
        <div className='detail'>
            <div className="contact">
                <h1>問い合わせ</h1>
                <div className='item'>
                    <h4>名前</h4>
                    <input onChange={(e) => { setName(e.target.value) }} value={name} />
                </div>
                <p className='warn'>{Error?.name}</p>
                <div className='item'>
                    <h4>eメール</h4>
                    <input onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </div>
                <p className='warn'>{Error?.email}</p>

                <div className='item'>
                    <h4>eメール（確認）</h4>
                    <input onChange={(e) => { setEmailRe(e.target.value) }} value={emailRe} />
                </div>
                <p className='warn'>{Error?.emailre}</p>

                <div className='item'>
                    <h4>電話番号</h4>
                    <input onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                </div>
                <p className='warn'></p>
                <div className='item'>
                    <h4>タイトル</h4>
                    <input onChange={(e) => { setTitle(e.target.value) }} value={title} />
                </div>
                <p className='warn'>{Error.title}</p>
                <div className='item' style={{ display: "flex" }}>
                    <h4 style={{ lineHeight: "65px" }}>について</h4>
                    <Accordion title={request || '---'} width='max-content'
                        data={[
                            { name: "---", func: () => setRequest("") },
                            { name: "いち", func: () => setRequest("いち") },
                            { name: "に", func: () => setRequest("に") },
                            { name: "さん", func: () => setRequest("さん") },
                            { name: "し", func: () => setRequest("し") }
                        ]} />
                </div>
                <div className='item'>
                    <h4>内容</h4>
                    <div className='editcontent' contentEditable={true} onInput={(e) => { setContent(e.currentTarget.innerHTML) }} />
                </div>
                <p className='warn'>{Error.content}</p>
                <div className='button'>
                    <Button name='確認' onClick={() => store.dispatch(setAlert({ value: false, open: true, msg: "この内容で送信します" }))} />
                </div>
            </div>
        </div>
    )
}

export default Contact