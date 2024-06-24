'use client'
import NoUser from '@/api/noUser'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import Image from 'next/image'
type Props = {
    params: { archive: string, slug: string }
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
            getNew(params.archive, params.slug, "preview")
            :
            getNew(params.archive, params.slug, "")
    }, [])

    return (
        <div className='detail'>
            <div className='cover'>
                {news?.cover?.name ?
                    <Image src={process.env.FTP_URL + "img/" + news.cover?.name} alt='item' fill unoptimized /> :
                    null}

                <h1>
                    {news?.title}<br></br>
                    <span>{news?.position}</span>
                </h1>
            </div>
            <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: news?.content }} />
        </div>
    )
}

export default Page