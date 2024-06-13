'use client'
import NoUser from '@/api/noUser'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
type Props = {
    params: { archive: string, slug: string }
}

const Page = ({ params }: Props) => {
    const [news, setNews] = useState<any>()

    const getNew = async (g: string, s: string, pre: string) => {
        const result = await NoUser.getItem({ genre: g, slug: s, pre: pre })

        console.log(result)

        if (result.success) {
            setNews(result.data[0])
        } else {

        }
    }

    useEffect(() => {
        getNew("fpage", "service", "")
    }, [])

    return (
        <div className='detail'>
            <h1>{news?.title}</h1>
            <p>{moment(news?.createDate).format('YY/MM/DD')}</p>
            <div className='dangerousBox' dangerouslySetInnerHTML={{ __html: news?.content }} />
        </div>
    )
}

export default Page