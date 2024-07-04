'use client'
import React, { useState, useEffect } from 'react'
import NoUser from '@/api/noUser'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Pagination from '@/component/tool/pagination'
import SearchBox from '@/component/input/searchBox'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { UserAuthen } from '@/api/UserAuthen'
import { setNotice } from '@/redux/reducer/noticeReducer'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Link from 'next/link'
import SortIcon from '@mui/icons-material/Sort';
import AccordionIcon from '@/component/tool/accordionIcon'
import moment from 'moment'
import Loading from '@/component/loading'
import { AlertType, setAlert } from '@/redux/reducer/alertReducer'
const Page = () => {

    const [currentTheme, setCurrentTheme] = useState<boolean>(store.getState().theme)
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const update = () => {
        store.subscribe(() => setCurrentTheme(store.getState().theme))
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentAlert(store.getState().alert))
    }
    useEffect(() => {
        update()
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<number>(0)

    const [news, setNews] = useState<any[]>([])
    const [pageName, setPageName] = useState<string>("")
    const [itemId, setItemId] = useState<string>("")

    const [search, setSearch] = useState<string>("")
    const [sort, setSort] = useState<string>("editDate")
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const [end, setEnd] = useState<boolean>(true)


    const getItem = async (g: string, s: string, sk: number, li: number, sort: string) => {
        const result = await NoUser.getItem({ genre: g, search: s, skip: sk, limit: li, sort: sort })
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
    const getItemPlus = async (g: string, s: string, sk: number, li: number, sort: string) => {
        const result = await NoUser.getItem({ genre: g, search: s, skip: sk + li, limit: li, sort })
        setEnd(result.data?.length ? false : true)
    }

    const topage = useRouter()

    useEffect(() => {
        getItem("fpage", search, page * limit, limit, sort)
        getItemPlus("fpage", search, page * limit, limit, sort)
    }, [refresh, search, page, sort])

    const toPage = useRouter()

    const deleteItem = async (p: string, a: string, id: string) => {
        const result = await UserAuthen.deleteItem(p, a, id)
        if (result.success) {
            setRefresh(n => n + 1)
            store.dispatch(setNotice({ success: result.success, msg: "この固定ページが削除されました。", open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }

    useEffect(() => {
        currentAlert.value === true && itemId && deleteItem(currentUser.position, "fpage", itemId)
    }, [currentAlert.value])

    return (
        loading ? <div className={`archive`}>loading...</div> :
            <div className={`archive`}>
                <div className={`items ${currentTheme ? "light1" : "dark1"}`}>
                    <div className='title_items'>
                        <h3>{pageName} <span onClick={() => toPage.push("/admin/fpage/news")}>{pageName && `新規の${pageName}`}</span></h3>
                        <SearchBox placehoder='検索' func={(v) => setSearch(v)} right='40px' />
                        <AccordionIcon icon={<SortIcon />}
                            data={[{
                                name: "タイトル",
                                func: () => setSort("title"),
                            },
                            {
                                name: "日付",
                                func: () => setSort(""),
                            },
                            ]}
                            top={"5px"}
                            right={"10px"}
                        />

                    </div>

                    {news.map((n: any, index: number) =>
                        <div key={index} className='item'>
                            <div style={{ display: "flex" }}>
                                <DescriptionOutlinedIcon />
                                <h4 onClick={() => topage.push("/admin/fpage/" + n.slug)}
                                    style={{ fontWeight: n.resend ? "normal" : n.read ? "normal" : "bold", overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}
                                >{n.title}</h4>
                            </div>
                            {n.editDate ?
                                <p style={{ overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}><span style={{ fontSize: "50%", opacity: 0.75, color: "green" }}>最新編集 </span>{moment(n.editDate).format('YY/MM/DD')}</p> :
                                <p style={{ overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}>{moment(n.createDate).format('YY/MM/DD')}</p>}
                            <div className="icons">
                                <Link style={{ color: "inherit" }} href={"/home/" + n.slug} target='_blank'><RemoveRedEyeOutlinedIcon /></Link>
                                {/* <ContentCopyIcon onClick={() => topage.push("/admin/fpage/news/" + n.slug)} /> */}
                                <DeleteOutlineOutlinedIcon onClick={() => { setItemId(n._id), store.dispatch(setAlert({ value: false, msg: "このページを削除したいですか？", open: true })) }} />
                            </div>
                        </div>)}
                </div>
                <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={end} />
            </div>

    )
}

export default Page