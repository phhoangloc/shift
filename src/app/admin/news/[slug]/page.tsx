'use client'
import React, { useState, useEffect } from 'react'
import store from '@/redux/store'
import NoUser from '@/api/noUser'
import Input from '@/component/input/input'
import TextAreaTool from '@/component/input/textareaTool'
import Accordion from '@/component/tool/accordion'
import Button from '@/component/input/button'
import { UserAuthen } from '@/api/UserAuthen'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
type Props = {
    params: { slug: string }
}

const Page = ({ params }: Props) => {
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

    const [title, setTitle] = useState<string>("")
    const [modelName, setModelName] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [slug, setSlug] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [newContent, setNewContent] = useState<string>("")
    const [model, setModel] = useState<any[]>([])

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [sendMailContent, setSendMailContent] = useState<string>("")

    const bodyMail = {
        name,
        email,
        phone,
        content: sendMailContent,
        title,
        slug: email + title + "true",
        resend: true,
    }

    const getModel = async () => {
        const result = await NoUser.getModel()
        setModel(result)
    }

    useEffect(() => {
        getModel()
    }, [])

    const getItem = async (g: string, s: string) => {
        const result = await NoUser.getItem({ genre: g, slug: s })
        if (result.success && result.data[0]?._id) {
            setModelName(result.name)
            setId(result.data[0]._id)
            setTitle(result.data[0].title)
            setSlug(result.data[0].slug)
            setCategory(result.data[0].category)
            setContent(result.data[0].content)
            setName(result.data[0].name)
            setEmail(result.data[0].email)
            setPhone(result.data[0].phone)
            setLoading(false)

        } else {
            setModelName("")
            setId("")
            setTitle("")
            setSlug("")
            setCategory("")
            setNewContent("")
            setName("")
            setEmail("")
            setPhone("")
            setLoading(false)
        }
    }


    useEffect(() => {
        getItem("news", params.slug)
    }, [model])



    const body = {
        title, slug, category, content: newContent || content
    }

    const updateNews = async (body: any, id: string) => {
        const result = await UserAuthen.editItem(currentUser.position, "news", body, id)
        if (result.success) {
            toPage.push('/admin/news/' + slug)
        }
    }

    const createNews = async (body: any) => {
        const result = await UserAuthen.createItem(currentUser.position, "news", body)
        if (result.success) {
            toPage.push('/admin/news/' + slug)
        }
    }

    const toPage = useRouter()

    return (
        loading ? <div className={`detail`}>loading...</div> :
            <div className={`detail`}>
                <div className={`item ${currentTheme ? "light1" : "dark1"}`}>
                    <h2>タイトル : {title ? title : "新規タイトル"}</h2>
                    <div style={{ display: "flex" }}><p>プレビュー </p>

                        {slug ?
                            <Link
                                href={'/home/news/previewad31'}
                                target='_blank'>
                                <p onClick={() => { updateNews({ title, category, slug: "previewad31", content: newContent || content }, "665feb4450f19c296fbcad31") }}>{'/home/news/previewad31'}</p>
                            </Link> :
                            "新規リンク"}
                    </div>
                </div>
                <div className={`item ${currentTheme ? "light1" : "dark1"}`}>
                    <div className='edittitle'><h3>このページの編集 <span onClick={() => toPage.push("/admin/news/news")}>{modelName && `新規の${modelName}`}</span></h3></div>
                    <Input name="タイトル" onChange={(v) => setTitle(v)} value={title} />
                    <Input name="スラグ" onChange={(v) => setSlug(v)} value={slug} />
                    <Accordion title={category ? category : "category"}
                        data={[
                            {
                                name: "---",
                                func: () => setCategory(""),
                            },
                            {
                                name: "お知らせ",
                                func: () => setCategory("お知らせ"),
                            },
                            {
                                name: "災害情報",
                                func: () => setCategory("災害情報"),
                            }]} width='max-content' />
                    <TextAreaTool onChange={(v) => setNewContent(v)} value={content} />
                    {id ? <Button name='保存' onClick={() => updateNews(body, id)} /> : <Button name='作成' onClick={() => createNews(body)} />}
                </div>
            </div>
    )


}

export default Page