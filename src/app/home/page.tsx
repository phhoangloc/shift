'use client'
import React, { useEffect, useState } from 'react'
import NoUser from '@/api/noUser'
import Image from 'next/image'
import moment from 'moment'
import { useRouter } from 'next/navigation'
const Home = () => {
    const [news, setNews] = useState<any[]>([])
    const [newsLimit, setNewsLimit] = useState<any[]>([])
    const [pageName, setPageName] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [categories, setCategories] = useState<any[]>([])

    const getItem = async (g: string, c: string) => {
        const result = await NoUser.getItem({ genre: g, category: c })
        if (result.success) {
            setNews(result.data)
        }
    }
    const getItemLimit = async (g: string, c: string) => {
        const result = await NoUser.getItem({ genre: g, category: c, limit: 1 })
        if (result.success) {
            setNewsLimit(result.data)

        }
    }
    const getCategory = async (g: string) => {
        const result = await NoUser.getItem({ genre: g })
        if (result.success) {
            setCategories(result.data)
        }
    }
    useEffect(() => {
        getItem("news", category)
    }, [category])

    useEffect(() => {
        getItemLimit("news", "66a1b456b5be3ef6af8de852")
    }, [])
    useEffect(() => {
        getCategory("category")
    }, [])
    const topage = useRouter()
    return (
        <div className='home'>
            <div className='cover'>
                <Image src={"/image/cover.jpg"} fill style={{ objectFit: "cover" }} alt='cover' />
            </div>
            <div className='newsLimit'>
                <p className='title'>災害情報</p>
                {newsLimit.map((n: any, index: number) =>
                    <div key={index} className='item' >
                        <h4 onClick={() => topage.push("/home/news/" + n.slug)}><span>{moment(n.createDate).format('YY/MM/DD')}</span>{n.title}</h4>
                    </div>)}
            </div>
            <div className='news'>
                <h3>ニュース <span onClick={() => topage.push("/home/news/")}>もっと</span></h3>
                <div className='grid_box categorySelect'>
                    <p onClick={() => setCategory("")}>すべて</p>
                    {categories.map((n: any, index: number) => <p key={index} onClick={() => setCategory(n._id)}>{n.name}</p>)}
                </div>
                <div className='items'>
                    {news.map((n: any, index: number) =>
                        <div key={index} className='item' >
                            <div className='time'>{moment(n.createDate).format('YY/MM/DD')}</div>
                            <h4 onClick={() => topage.push("/home/news/" + n.slug)}> {n.title}</h4>
                            <div style={{ display: "flex" }}>{n.category?.map((c: any, index: number) => <p key={index}>{c.name}</p>)}</div>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default Home