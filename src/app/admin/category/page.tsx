'use client'
import React, { useState, useEffect } from 'react'
import NoUser from '@/api/noUser'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Pagination from '@/component/tool/pagination'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SearchBox from '@/component/input/searchBox'
import { UserAuthen } from '@/api/UserAuthen'
import { setNotice } from '@/redux/reducer/noticeReducer'
import { AlertType, setAlert } from '@/redux/reducer/alertReducer'
import CategoryIcon from '@mui/icons-material/Category';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
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

    const [loading, setLoading] = useState<boolean>(true)
    const [refresh, setRefresh] = useState<number>(0)
    const [isNews, setIsNews] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [news, setNews] = useState<any[]>([])
    const [pageName, setPageName] = useState<string>("")
    const [itemId, setItemId] = useState<string>("")


    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(30)
    const [end, setEnd] = useState<boolean>(true)

    const [name, setName] = useState<string>("")
    const [editname, setEditName] = useState<string>("")

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
        getItem("category", search, page * limit, limit)
        getItemPlus("category", search, page * limit, limit)
    }, [refresh, search, page])

    setTimeout(() => {
        setLoading(false)
    }, 2000)

    const toPage = useRouter()

    const deleteItem = async (p: string, a: string, id: string) => {
        const result = await UserAuthen.deleteItem(p, a, id)
        if (result.success) {
            setRefresh(n => n + 1)
            // toPage.push("/admin/staff") 
            store.dispatch(setNotice({ success: result.success, msg: "このカテゴリーが削除されました。", open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }
    useEffect(() => {
        currentAlert.value === true && itemId && deleteItem(currentUser.position, "category", itemId)
    }, [currentAlert.value])

    const addCategory = async (body: any) => {
        const result = await UserAuthen.createItem(currentUser.position, "category", body)
        if (result.success) {
            setRefresh(n => n + 1)
            setIsNews(false)
            setName("")
        }
    }
    const updateCategory = async (id: string, body: any) => {
        const result = await UserAuthen.editItem(currentUser.position, "category", body, id)
        if (result.success) {
            setRefresh(n => n + 1)
            setIsEdit(false)
            setEditName("")
        }
    }
    return (
        loading ? <div className={`archive`}>loadding...</div> :
            <div className={`archive`}>
                <div className={`items ${currentTheme ? "light1" : "dark1"}`}>
                    <div className='title_items'>
                        <h3>{pageName} <span onClick={() => setIsNews(!isNews)}>{pageName && `新規の${pageName}`}</span></h3>
                        <SearchBox placehoder='検索' func={(v) => setSearch(v)} />
                    </div>
                    {
                        isNews ?
                            <div style={{ display: "flex" }}>
                                <input style={{ borderRadius: "5px", fontSize: "1rem" }} placeholder='新規カテゴリー' onChange={(e) => { setName(e.target.value) }} />
                                <p className='link_hover' onClick={() => addCategory({ name })} style={{ width: "50px", aspectRatio: 1, lineHeight: "50px", margin: "0 10px", cursor: "pointer" }}>確認</p>
                            </div> :
                            null
                    }

                    {news.map((n: any, index: number) =>
                        <div key={index} className='item'>
                            {isEdit && itemId === n._id ?
                                <input style={{ borderRadius: "5px", fontSize: "1rem" }} placeholder='新規カテゴリー' onChange={(e) => { setEditName(e.target.value) }} value={editname} /> :
                                <div style={{ display: "flex" }}>
                                    <CategoryIcon />
                                    <h4 style={{ fontWeight: n.resend ? "normal" : n.read ? "normal" : "bold", overflow: "hidden", textWrap: "nowrap", textOverflow: "ellipsis" }}>{n.name}</h4>
                                </div>}
                            <div className="icons">
                                {isEdit && itemId === n._id ?
                                    <>
                                        <CheckIcon onClick={() => updateCategory(itemId, { name: editname })} />
                                        <CloseIcon onClick={() => { setEditName(""), setIsEdit(false) }} />
                                    </> :
                                    <EditOutlinedIcon onClick={() => { setItemId(n._id), setIsEdit(true), setEditName(n.name) }} />}
                                <DeleteOutlineOutlinedIcon onClick={() => { setItemId(n._id), store.dispatch(setAlert({ value: false, msg: "このカテゴリーを削除したいですか？", open: true })) }} />
                            </div>
                        </div>
                    )}
                </div>
                <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={end} />
            </div>

    )
}

export default Page