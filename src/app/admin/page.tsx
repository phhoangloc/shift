'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import { useRouter } from 'next/navigation'
import NoUser from '@/api/noUser'
import moment from 'moment'
import { UserAuthen } from '@/api/UserAuthen'
type Props = {}

const Page = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [news, setNews] = useState<any[]>([])
    const toPage = useRouter()
    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }

    useEffect(() => {
        update()
    })


    const getNews = async (g: string, s: string, sk: number, li: number) => {
        const result = await NoUser.getItem({ genre: g, search: s, skip: sk, limit: li })
        if (result.success) {
            setLoading(false)
            setNews(result.data)
        } else {
            setLoading(false)
            setNews([])
        }
    }

    useEffect(() => {
        getNews("news", "", 0, 3)
    }, [])

    const now = Date.now()

    const [mails, setMails] = useState<any[]>([])

    const getMail = async () => {
        setLoading(true)
        const result = await UserAuthen.getMail(currentUser.position, 0, 50)
        if (result.success) {
            setMails(result.data)
            setLoading(false)
        } else {
            setMails([])
            setLoading(false)
        }
    }

    useEffect(() => {
        getMail()
    }, [])


    return (
        loading ? <div className={`archive`}>loading...</div> :
            <div className='grid_box'>
                <div className='xs12  ' style={{ padding: "5px" }}>
                    <div className={` ${currentTheme ? "light1" : "dark1"}`} style={{ padding: "25px", boxShadow: "0px 0px 1px #888", borderRadius: "5px", height: "100%" }}>
                        <h2>こんにちは、{currentUser.username} さん</h2>
                        <p>今日は{moment(now).format("YYYY年MM月DD日")}</p>
                    </div>
                </div>

                <div className='xs12 ' style={{ padding: "5px" }}>
                    <div className={` ${currentTheme ? "light1" : "dark1"}`} style={{ padding: "25px", boxShadow: "0px 0px 1px #888", borderRadius: "5px" }}>
                        <div style={{ display: "flex", marginBottom: "20px" }}>
                            <h3>ニュース</h3>
                            <h4 className='link_hover' onClick={() => toPage.push("/admin/news/news")} style={{ margin: "auto 20px 0", fontWeight: "100", cursor: "pointer", opacity: "0.5" }} >新規のニュース</h4>
                        </div>
                        {news.map((n: any, index: number) =>
                            <div
                                key={index}
                                style={{ display: "flex", height: "30px", lineHeight: "30px", borderBottom: "1px solid", margin: "5px 0", justifyContent: "space-between" }}
                            >
                                <h4 onClick={() => { toPage.push("/admin/news/" + n.slug) }} style={{ fontWeight: n.resend ? "normal" : n.read ? "normal" : "bold", overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}>・ {n.title}</h4>
                                <p style={{ fontSize: "0.75rem", opacity: 0.75 }} >{moment(n.createDate).format('YY/MM/DD')}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className='xs12 ' style={{ padding: "5px" }}>
                    <div className={` ${currentTheme ? "light1" : "dark1"}`} style={{ padding: "25px", boxShadow: "0px 0px 1px #888", borderRadius: "5px", height: "100%" }}>
                        <div style={{ display: "flex", marginBottom: "20px" }}>
                            <h3>問い合わせ</h3>
                            <h4 className='link_hover' onClick={() => toPage.push("/admin/mails")} style={{ margin: "auto 20px 0", fontWeight: "100", cursor: "pointer", opacity: "0.5" }} >すべて</h4>
                        </div>
                        {mails
                            .sort((a: any, b: any) => b.id - a.id)
                            .filter(n => n.email.includes("問い合わせ") || n.subject.includes("<reply>"))
                            .map((n: any, index: number) =>
                                <div
                                    key={index}
                                    style={{ display: "flex", height: "30px", lineHeight: "30px", borderBottom: "1px solid", margin: "5px 0", justifyContent: "space-between" }}
                                >
                                    <h4 onClick={() => { toPage.push("/admin/news/" + n.slug) }} style={{ fontWeight: n.resend ? "normal" : n.read ? "normal" : "bold", overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}>
                                        <span style={{ fontWeight: "normal" }}>from </span>
                                        {n.email}
                                    </h4>
                                    <p style={{ fontSize: "0.75rem", opacity: 0.75 }} >{moment(n.date).format('YY/MM/DD')}</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
    )

}

export default Page