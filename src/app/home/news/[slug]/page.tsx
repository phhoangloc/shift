'use client'
import NoUser from '@/api/noUser'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
type Props = {
    params: { slug: string }
}

const Page = ({ params }: Props) => {
    const [news, setNews] = useState<any>()

    const getNew = async (g: string, s: string, pre: string) => {
        const result = await NoUser.getItem({ genre: g, slug: s, pre: pre })
        if (result.success) {
            setNews(result.data[0])
        } else {

        }
    }

    useEffect(() => {
        params.slug === "previewad31" ?
            getNew("news", params.slug, "newspreview")
            :
            getNew("news", params.slug, "")
    }, [])

    return (
        <div className='detail'>
            <h3>{news?.title}</h3>
            <p>{moment(news?.createDate).format('YY/MM/DD')}</p>
            <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: news?.content }} />
        </div>
    )
}

export default Page