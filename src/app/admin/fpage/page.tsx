'use client'
import React, { useState, useEffect } from 'react'
import NoUser from '@/api/noUser'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Pagination from '@/component/tool/pagination'
import Input from '@/component/input/input'

const Page = () => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)

    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
    }

    useEffect(() => {
        update()
    })

    const [loading, setLoading] = useState<boolean>(true)

    const [news, setNews] = useState<any[]>([])
    const [pageName, setPageName] = useState<string>("")
    const [model, setModel] = useState<any[]>([])

    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const [end, setEnd] = useState<boolean>(true)

    const getModel = async () => {
        const result = await NoUser.getModel()
        setModel(result)
    }

    useEffect(() => {
        getModel()
    }, [])

    const getItem = async (g: string, s: string, sk: number, li: number) => {
        const result = await NoUser.getItem({ genre: g, search: s, skip: sk, limit: li })
        if (result.success) {
            setNews(result.data)
            setPageName(result.name)
            setLoading(false)
        } else {
            setNews([])
            setPageName("")
            setLoading(false)
        }
    }
    const getItemPlus = async (g: string, s: string, sk: number, li: number) => {
        const result = await NoUser.getItem({ genre: g, search: s, skip: sk + li, limit: li })
        setEnd(result.data?.length ? false : true)
    }

    const topage = useRouter()

    useEffect(() => {
        getItem("fpage", search, page * limit, limit)
        getItemPlus("fpage", search, page * limit, limit)
    }, [search, page])

    setTimeout(() => {
        setLoading(false)
    }, 2000)

    const toPage = useRouter()
    return (
        loading ? <div className={`archive`}>loading...</div> :
            <div className={`archive`}>
                <div className={`items ${currentTheme ? "light1" : "dark1"}`}>
                    <h3>{pageName} <span onClick={() => toPage.push("/admin/fpage/news")}>{pageName && `新規の${pageName}`}</span></h3>

                    <Input name="search" onChange={(v) => setSearch(v)} value={search} />
                    {news.map((n: any, index: number) =>
                        <div key={index} className='item'
                            onClick={() => topage.push("/admin/fpage/" + n.slug)}>
                            <h4 style={{ fontWeight: n.resend ? "normal" : n.read ? "normal" : "bold" }}>{n.title}</h4>
                        </div>)}
                </div>
                <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={end} />
            </div>

    )
}

export default Page