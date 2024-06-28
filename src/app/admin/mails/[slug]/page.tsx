'use client'
import React, { useState, useEffect, useRef } from 'react'
import store from '@/redux/store'
import NoUser from '@/api/noUser'
import Input from '@/component/input/input'
import TextAreaTool from '@/component/input/textareaTool'
import Accordion from '@/component/tool/accordion'
import Button from '@/component/input/button'
import { UserAuthen } from '@/api/UserAuthen'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setRefresh } from '@/redux/reducer/RefreshReduce'
import moment from 'moment'
type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })

    const toPage = useRouter()

    const boxRef = useRef<any>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [mail, setMail] = useState<any>({})
    const [pageName, setPageName] = useState<string>("")

    const getMail = async () => {
        const result = await UserAuthen.getMailById(currentUser.position, Number(params.slug))
        if (result.success) {
            setMail(result.data[0])
            setPageName(result.name)
            setLoading(false)
        } else {
            setMail([])
            setPageName("")
            setLoading(false)
        }
    }
    useEffect(() => {
        getMail()
    }, [])

    const emailAdd = boxRef.current?.childNodes?.[1]?.childNodes?.[3]?.innerText?.split(":")?.[1] || mail?.email?.split("\"")[2]?.match(/<([^>]+)>/)[1]

    const [reply, setReply] = useState<boolean>(false)
    const [replyContent, setRelyContent] = useState<string>("")

    const sendMail = async (s: string, e: string, r: string, be: string) => {
        const now = Date.now()
        const content = r + `<div style="border-left:1px solid;padding-left:5px;width:100%">
        ${moment(now).format("YYYY年MM月DD日 hh:mm")} from ${e}
        ${be}
        </div>`

        const body = {
            title: s.includes("<reply>") ? s : s + " <reply>",
            email: e,
            content,
        }



        const result = await UserAuthen.sendMail(currentUser.position, body)
        console.log(result)
        if (result.success) {
            toPage.push("/admin/mails")
        } else {
            alert("エラー")
        }
    }

    return (
        loading ? <div className={`detail`}>loading...</div> :
            <div className={`detail`}>
                <div className={`item ${currentTheme ? "light1" : "dark1"}`}>
                    <h3>{pageName}</h3>
                    <h4>{mail?.email?.split("\"")[1]}</h4>
                    <p><span>タイトル :</span> {mail?.subject}</p>
                    <p><span>eメール :</span> {mail?.email?.split("\"")[2]?.match(/<([^>]+)>/)[1]}</p>
                    <div ref={boxRef} className='dangerousBox' dangerouslySetInnerHTML={{ __html: mail.content }}></div>
                </div>
                {reply ? null : <div className={`button ${currentTheme ? "light1" : "dark1"}`}><Button name='返信' onClick={() => { setReply(true) }} /></div>}
                {reply ? <div className={`item ${currentTheme ? "light1" : "dark1"}`}>
                    <TextAreaTool onChange={(v) => setRelyContent(v)} value={""} />
                    <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: mail.content }} ></div>
                    <div className={`button ${currentTheme ? "light1" : "dark1"}`}><Button name="送信" onClick={() => sendMail(mail.subject, emailAdd, replyContent, mail.content)} /></div>
                </div> : null}
            </div>
    )

}


export default Page