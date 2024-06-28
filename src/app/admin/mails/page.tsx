'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/redux/store'
import Pagination from '@/component/tool/pagination'
import { UserAuthen } from '@/api/UserAuthen'
import moment from 'moment'
import RefreshIcon from '@mui/icons-material/Refresh';
import Loading from '@/component/loading'
type Props = {
    params: { archive: string }
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

    const [mails, setMails] = useState<any[]>([])
    const [pageName, setPageName] = useState<string>("")

    const [search, setSearch] = useState<string>("")
    const [page, setPage] = useState<number>(0)
    const [refresh, setRefresh] = useState<number>(0)
    const [limit, setLimit] = useState<number>(50)

    const topage = useRouter()

    const getMail = async () => {
        setLoading(true)
        const result = await UserAuthen.getMail(currentUser.position, page, limit)
        if (result.success) {
            setMails(result.data)
            setPageName(result.name)
            setLoading(false)
        } else {
            setMails([])
            setPageName("")
            setLoading(false)
        }
    }
    useEffect(() => {
        getMail()
    }, [page, refresh])

    const updateMail = async (id: string) => {
        topage.push("/admin/mails/" + id)
    }

    return (
        loading ? <div className={`archive`}>loading...</div> :
            <div className={`archive`}>
                <div className={`items ${currentTheme ? "light1" : "dark1"}`}>
                    <h3>{pageName} <RefreshIcon onClick={() => setRefresh(n => n + 1)} /></h3>
                    {/* <Input name="search" onChange={(v) => setSearch(v)} value={search} /> */}
                    {mails.sort((a: any, b: any) => b.id - a.id)
                        .filter(n => n.email.includes("問い合わせ") || n.subject.includes("<reply>"))
                        .map((n: any, index: number) =>
                            <div key={index}
                                onClick={() => updateMail(n.id)}
                                className='mail'>
                                <h4>
                                    <span>{moment(n.date).format('MM月DD日 HH時mm')}</span><br></br>
                                    {n.email}</h4>
                                <p>{n.subject}</p>
                            </div>
                        )}
                </div>
                <Pagination page={page} next={() => setPage(p => p + 1)} prev={() => setPage(p => p - 1)} end={true} />
            </div>
    )
}

export default Page