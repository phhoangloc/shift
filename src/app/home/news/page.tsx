'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NoUser from '@/api/noUser'
import moment from 'moment'


const Page = () => {
    const topage = useRouter()

    const [category, setCategory] = useState<string>("")
    const [news, setNews] = useState<any[]>([])
    const [pageName, setpageName] = useState<"">("")

    const getItem = async (g: string, c: string) => {
        const result = await NoUser.getItem({ genre: g, category: c })
        if (result.success) {
            setNews(result.data)
            setpageName(result.name)
        } else {
            setNews([])
            setpageName("")
        }
    }

    useEffect(() => {
        getItem("news", category)
    }, [category])

    return (
        <div className='archive'>
            <div className='news'>
                <h1>{pageName}</h1>
                <div className='categorySelect'>
                    <p onClick={() => setCategory("")}>すべて</p>
                    <p onClick={() => setCategory("お知らせ")}>お知らせ</p>
                    <p onClick={() => setCategory("災害情報")}>災害情報</p>
                </div>
                {news.map((n: any, index: number) =>
                    <div key={index} className='item' >
                        <h4 onClick={() => topage.push("/home/news/" + n.slug)}> {n.title}</h4>
                        <div className='category' style={{ display: "flex", flexWrap: "wrap" }}>{n.category?.map((c: any, index: number) => <p key={index}>{c.name}</p>)}</div>
                        <p>{moment(n.createDate).format('YY/MM/DD')}</p>
                    </div>)}
            </div>
        </div>
    )
}

export default Page