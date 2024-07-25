'use client'
import React, { useEffect, useState } from 'react'
import NoUser from '@/api/noUser'
import Image from 'next/image'
import moment from 'moment'
import { useRouter } from 'next/navigation'
const Home = () => {
    const [news, setNews] = useState<any[]>([])
    const [pageName, setPageName] = useState<string>("")
    const [category, setCategory] = useState<string>("")

    const getItem = async (g: string, c: string) => {
        const result = await NoUser.getItem({ genre: g, category: c })
        console.log(result)
        if (result.success) {
            setNews(result.data)
            setPageName(result.name)
        }
    }

    useEffect(() => {
        getItem("news", category)
    }, [category])

    const topage = useRouter()
    return (
        <div className='home'>
            <div className='cover'>
                <Image src={"/image/cover.jpg"} fill style={{ objectFit: "cover" }} alt='cover' />
            </div>
            <div className='news'>
                <h3>{pageName} <span onClick={() => topage.push("/home/news/")}>もっと</span></h3>
                <div className='categorySelect'>
                    <p onClick={() => setCategory("")}>すべて</p>
                    <p onClick={() => setCategory("お知らせ")}>お知らせ</p>
                    <p onClick={() => setCategory("災害情報")}>災害情報</p>
                </div>
                {news.map((n: any, index: number) =>
                    <div key={index} className='item' >
                        <h4 onClick={() => topage.push("/home/news/" + n.slug)}><span>{moment(n.createDate).format('YY/MM/DD')}</span> {n.title}</h4>
                        {n.category?.map((c: any, index: number) => <p key={index}>{c.name}</p>)}
                    </div>)}
            </div>
        </div>
    )
}

export default Home