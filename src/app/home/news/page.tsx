'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NoUser from '@/api/noUser'
import moment from 'moment'


const Page = () => {
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
        <div className='archive'>
            <div className='news'>
                <h1>ニュース</h1>
                <div className='grid_box categorySelect'>
                    <p onClick={() => setCategory("")}>すべて</p>
                    {categories.map((n: any, index: number) => <p key={index} onClick={() => setCategory(n._id)}>{n.name}</p>)}
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