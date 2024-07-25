'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import NoUser from '@/api/noUser'
import Input from '@/component/input/input'
import TextAreaTool from '@/component/input/textareaTool'
import Button from '@/component/input/button'
import { UserAuthen } from '@/api/UserAuthen'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setNotice } from '@/redux/reducer/noticeReducer'
import { AlertType } from '@/redux/reducer/alertReducer'
import { setAlert } from '@/redux/reducer/alertReducer'
import moment from 'moment'
import TextAreaTool_v2 from '@/component/input/textareaTool_v2'
import ImageModal from '@/component/modal/imageModal'
type Props = {
    params: { slug: string }
}

const Page = ({ params }: Props) => {

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

    const [modalOpen, setModalOpen] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)
    const [savable, setSavable] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const [id, setId] = useState<string>("")
    const [slug, setSlug] = useState<string>("page_" + moment(new Date).format("YYYY_MM_DD_HH_mm"))

    const [content, setContent] = useState<string>("")
    const [newContent, setNewContent] = useState<string>("")

    const [pics, setPics] = useState<string[]>([])
    const [idPic, setidPic] = useState<string>("")

    const getItem = async (g: string, s: string) => {
        const result = await NoUser.getItem({ genre: g, slug: s })
        if (result.success && result.data[0]?._id) {
            setId(result.data[0]._id)
            setTitle(result.data[0].title)
            setSlug(result.data[0].slug)
            setContent(result.data[0].content)
            setLoading(false)
        } else {
            setId("")
            setTitle("")
            setNewContent("")
            setLoading(false)
        }
    }

    useEffect(() => {
        params.slug[0] === "news" ? params.slug[1] ? getItem("fpage", params.slug[1]) : null : getItem("fpage", params.slug[0])
    }, [])

    const body = {
        title, slug, content: newContent || content, editDate: new Date()
    }

    const updateNews = async (body: any, id: string) => {
        const result = await UserAuthen.editItem(currentUser.position, "fpage", body, id)
        if (result.success) {
            toPage.push('/admin/fpage/')
        }
    }

    const createNews = async (body: any) => {
        const result = await UserAuthen.createItem(currentUser.position, "fpage", body)
        if (result.success) {
            toPage.push('/admin/fpage/' + slug)
        }
    }

    const toPage = useRouter()

    const deleteItem = async (p: string, a: string, id: string) => {
        const result = await UserAuthen.deleteItem(p, a, id)
        if (result.success) {
            toPage.push("/admin/fpage")
            store.dispatch(setNotice({ success: result.success, msg: "この固定ページが削除されました。", open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }

    useEffect(() => {
        currentAlert.value === true && id && deleteItem(currentUser.position, "fpage", id)
    }, [currentAlert.value])

    const getPicbyId = async (id: string) => {
        const result = await NoUser.getPicById(id)
        if (result.success) {
            setPics([result.data[0].name])
        }
    }

    useEffect(() => {
        idPic && getPicbyId(idPic)
    }, [idPic])

    return (
        loading ? <div className={`detail`}>loading...</div> :
            <div className={`detail`}>
                <div className={`item ${currentTheme ? "light1" : "dark1"}`}>
                    <h2>タイトル : {title ? title : "新規タイトル"}</h2>
                    <div style={{ display: "flex" }}><p>プレビュー </p>
                        {slug ?
                            <Link
                                href={`/home/fpage/previewad31`}
                                target='_blank'>
                                <p onClick={() => { updateNews({ title, slug: "previewad31", content: newContent || content }, "666a62a5121fb1d19de5ed62") }}>{'/home/fpage/previewad31'}</p>
                            </Link> :
                            "新規リンク"}
                    </div>
                </div>
                <div className={`item ${currentTheme ? "light1" : "dark1"}`}>
                    <div className='edittitle'><h3>このページの編集 </h3></div>
                    <Input name="タイトル" onChange={(v) => { setSavable(true), setTitle(v) }} value={title} />
                    <Input name="スラグ" onChange={(v) => { setSavable(true), setSlug(v) }} value={slug} />
                    <TextAreaTool_v2 onChange={(v) => { setSavable(true), setNewContent(v) }} value={content} onGetPic={() => { setModalOpen(true) }} pics={pics} />
                    <div style={{ display: 'flex' }}>
                        <Button name='戻る' onClick={() => toPage.push('/admin/fpage/')} />
                        {params.slug[0] === "news" ? <Button name='作成' onClick={() => createNews(body)} /> : <Button name='保存' onClick={() => updateNews(body, id)} disable={!savable} />}
                        {params.slug[0] !== "news" && id ? <Button name='削除' onClick={() => store.dispatch(setAlert({ value: false, msg: "このページを削除したいですか？", open: true }))} /> : null}
                    </div>
                </div>
                <ImageModal modalOpen={modalOpen} onCanel={() => setModalOpen(false)} onSubmit={(id) => { setidPic(id); setModalOpen(false) }} />
            </div>
    )


}

export default Page