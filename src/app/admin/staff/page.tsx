'use client'
import React, { useState, useEffect } from 'react'
import NoUser from '@/api/noUser'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Pagination from '@/component/tool/pagination'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PeopleIcon from '@mui/icons-material/People';
import SearchBox from '@/component/input/searchBox'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Link from 'next/link'
import moment from 'moment'
import { UserAuthen } from '@/api/UserAuthen'
import { setNotice } from '@/redux/reducer/noticeReducer'
import Loading from '@/component/loading'
const Page = () => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })

    const [loading, setLoading] = useState<boolean>(true)

    const [news, setNews] = useState<any[]>([])
    const [pageName, setPageName] = useState<string>("")

    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const [end, setEnd] = useState<boolean>(true)

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
        getItem("staff", search, page * limit, limit)
        getItemPlus("staff", search, page * limit, limit)
    }, [search, page])

    setTimeout(() => {
        setLoading(false)
    }, 2000)

    const toPage = useRouter()

    const deleteItem = async (p: string, a: string, id: string) => {
        const result = await UserAuthen.deleteItem(p, a, id)
        if (result.success) {
            toPage.push("/admin/staff")
            store.dispatch(setNotice({ success: result.success, msg: "この固定ページが削除されました。", open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }
    return (
        loading ? <div className={`archive`}>loadding...</div> :
            <div className={`archive`}>
                <div className={`items ${currentTheme ? "light1" : "dark1"}`}>
                    <div className='title_items'>
                        <h3>{pageName} <span onClick={() => toPage.push("/admin/staff/news")}>{pageName && `新規の${pageName}`}</span></h3>
                        <SearchBox placehoder='検索' func={(v) => setSearch(v)} />
                    </div>
                    {news.map((n: any, index: number) =>
                        <div key={index} className='item'>
                            <div style={{ display: "flex" }}>
                                <PeopleIcon />
                                <h4 style={{ fontWeight: n.resend ? "normal" : n.read ? "normal" : "bold", overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}>{n.title}</h4>
                            </div>
                            <div className="icons">
                                <Link href={"/home/staff/" + n.slug} target='_blank'><RemoveRedEyeOutlinedIcon /></Link>
                                <EditOutlinedIcon onClick={() => topage.push("/admin/staff/" + n.slug)} />
                                <DeleteOutlineOutlinedIcon onClick={() => deleteItem(currentUser.position, "staff", n._id)} />
                            </div>
                        </div>
                    )}
                </div>
                <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={end} />
            </div>

    )
}

export default Page