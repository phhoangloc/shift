'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NoUser from '@/api/noUser'
import Image from 'next/image'
type Props = {
    params: { archive: string }
}

const Page = ({ params }: Props) => {
    const topage = useRouter()

    const [category, setCategory] = useState<string>("")
    const [news, setNews] = useState<any[]>([])
    const [pageName, setpageName] = useState<"">("")

    const getItem = async (g: string, c: string) => {
        const result = await NoUser.getItem({ genre: g, category: c })
        if (result.success) {
            setNews(result.data)
            setpageName(result.name)
        } else {
            setNews([])
            setpageName("")
        }
    }

    useEffect(() => {
        getItem(params.archive, category)
    }, [category])


    const memberSum = 10

    return (
        <div className='archive'>
            <div className='archive_title'>
                <div className='archive_title_cover'>
                    {Array.from({ length: memberSum }, (_, index) => index + 1).map((index: number) =>
                        <div className='archive_title_cover_item' key={index}>
                            <Image src={"/image/staffitem.jpg"} alt='item' fill style={{ animationDelay: `calc(0.2s * ${index}` }} />
                        </div>)}
                </div>
                <h1>マイ{pageName}</h1>
            </div>
            <div className='archive_body'>
                <p>home / {params.archive}</p>
                <div className='grid_box'>
                    {news.map((n: any, index: number) =>
                        <div key={index} className={`xs12 sm6 ${params.archive ? params.archive : 'item'}`} >
                            <div className='cover'>
                                {n.cover?.name ? <Image src={process.env.FTP_URL + "img/" + n.cover?.name} alt='item' fill unoptimized={false} /> : <Image src={"/image/staffitem.jpg"} alt='item' fill />}
                            </div>
                            <h3> {n.title}</h3>
                            <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: n.content }}></div>
                            <p onClick={() => topage.push("/home/staff/" + n.slug)}>詳細</p>
                        </div>)}
                </div>
            </div>
        </div>
    )
}

export default Page