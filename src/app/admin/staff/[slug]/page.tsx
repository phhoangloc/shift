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
import UploadIcon from '@mui/icons-material/Upload';
import Image from 'next/image'
import ImageModal from '@/component/modal/imageModal'
import Accordion from '@/component/tool/accordion'
import { setNotice } from '@/redux/reducer/noticeReducer'
import { AlertType, setAlert } from '@/redux/reducer/alertReducer'
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

    const [loading, setLoading] = useState<boolean>(true)
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [savable, setSavable] = useState<boolean>(false)


    const [title, setTitle] = useState<string>("")
    const [modelName, setModelName] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    const [position, setPosition] = useState<string>("")
    const [cover, setCover] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [newContent, setNewContent] = useState<string>("")
    const [preview, setPreview] = useState<any>("")


    const getItem = async (g: string, s: string) => {
        const result = await NoUser.getItem({ genre: g, slug: s })
        if (result.success && result.data[0]?._id) {
            setModelName(result.name)
            setId(result.data[0]._id)
            setTitle(result.data[0].title)
            setSlug(result.data[0].slug)
            setPosition(result.data[0].position)
            setContent(result.data[0].content)
            setCover(result.data[0].cover._id)
            setLoading(false)

        } else {
            setModelName("")
            setId("")
            setTitle("")
            setSlug("")
            setNewContent("")
            setLoading(false)
        }
    }

    const getPicbyId = async (p: string, id: string) => {
        const result = await NoUser.getPicById(id)
        if (result.success) {
            setPreview(process.env.FTP_URL + "img/shift/" + result.data[0].name)
        }
    }

    useEffect(() => {
        getItem("staff", params.slug)
    }, [])

    useEffect(() => {
        cover && getPicbyId(currentUser.position, cover)
    }, [cover])


    const body = {
        title, slug, position, cover, content: newContent || content, editDate: Date.now()
    }

    const updateNews = async (body: any, id: string) => {
        const result = await UserAuthen.editItem(currentUser.position, "staff", body, id)
        if (result.success) {
            toPage.push('/admin/staff/')
        }
    }

    const createNews = async (body: any) => {
        const result = await UserAuthen.createItem(currentUser.position, "staff", body)
        if (result.success) {
            toPage.push('/admin/staff/')
        }
    }

    const toPage = useRouter()

    const deleteItem = async (p: string, a: string, id: string) => {
        const result = await UserAuthen.deleteItem(p, a, id)
        if (result.success) {
            toPage.push("/admin/staff")
            store.dispatch(setNotice({ success: result.success, msg: "このスタッフのページが削除されました。", open: true }))
            setTimeout(() => {
                store.dispatch(setNotice({ success: false, msg: "", open: false }))
            }, 3000)
        }
    }
    useEffect(() => {
        currentAlert.value === true && id && deleteItem(currentUser.position, "staff", id)
    }, [currentAlert.value])

    return (
        loading ? <div className={`detail`}>loading...</div> :
            <div className={`detail`}>
                <div className={`item ${currentTheme ? "light1" : "dark1"}`}>
                    <h2>名前 : {title ? title : "新規スタッフ"}</h2>
                    <div style={{ display: "flex" }}><p>プレビュー </p>
                        {slug ?
                            <Link
                                href={'/home/staff/previewad31'}
                                target='_blank'>
                                <p onClick={() => { updateNews({ title, cover, slug: "previewad31", content: newContent || content }, "667239ab9bea006d3b093edb") }}>{'/home/staff/previewad31'}</p>
                            </Link> :
                            "新規リンク"}
                    </div>
                </div>
                <div className={`item ${currentTheme ? "light1" : "dark1"}`}>
                    <div className='edittitle'><h3>この{modelName}の編集</h3></div>
                    <Input name="名前" onChange={(v) => { setSavable(true), setTitle(v) }} value={title} />
                    <Input name="スラグ" onChange={(v) => { setSavable(true), setSlug(v) }} value={slug} />
                    <Accordion title={position ? position : "職種"}
                        data={[
                            {
                                name: "---",
                                func: () => { setSavable(true), setPosition("") },
                            },
                            {
                                name: "社長",
                                func: () => { setSavable(true), setPosition("社長") },
                            },
                            {
                                name: "部長",
                                func: () => { setSavable(true), setPosition("部長") },
                            },
                            {
                                name: "社員",
                                func: () => { setSavable(true), setPosition("社員") },
                            },
                            {
                                name: "バイト",
                                func: () => { setSavable(true), setPosition("バイト") },
                            },
                        ]} width='max-content'
                    />
                    <div style={{ position: "relative", minHeight: "50px", minWidth: "100px" }}>
                        <p>画像:</p>
                        <div style={{ border: "1px solid #aaa", width: "max-content", height: "300px", overflow: "hidden", position: "relative" }}>
                            {
                                preview && <Image src={preview} alt='item' width={500} height={500} style={{ height: "100%", width: "auto" }} priority sizes='100%' />
                            }
                            <UploadIcon onClick={(e) => setModalOpen(true)} style={{ position: "absolute", zIndex: 1, background: "white", borderRadius: "5px", bottom: "5px", right: "5px", padding: "1px", cursor: "pointer" }} />
                        </div>
                    </div>
                    <TextAreaTool onChange={(v) => { setSavable(true), setNewContent(v) }} value={content} />
                    <div style={{ display: 'flex' }}>
                        <Button name='戻る' onClick={() => toPage.push('/admin/staff/')} />
                        {id ? <Button name='保存' onClick={() => updateNews(body, id)} disable={!savable} /> : <Button name='作成' onClick={() => createNews(body)} disable={!savable} />}
                        {params.slug[0] !== "news" && id ? <Button name='削除' onClick={() => store.dispatch(setAlert({ value: false, open: true, msg: "このスタッフのページを削除したいですか？" }))} /> : null}
                    </div>
                </div>
                <ImageModal modalOpen={modalOpen} onCanel={() => setModalOpen(false)} onSubmit={(id: string) => { setModalOpen(false), setCover(id) }} />
            </div>
    )


}

export default Page