'use client'
import React, { useState, useEffect } from 'react'
import NoUser from '@/api/noUser'
import store from '@/redux/store'
import Image from 'next/image'
import UploadButton from '@/component/input/uploadButton'
import PendingIcon from '@mui/icons-material/Pending';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { UserAuthen } from '@/api/UserAuthen'
import ImageModalDetail from '@/component/modal/imageModalDetail'
const Page = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<number>(0)

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })
    const [data, setData] = useState<any[]>([])
    const getMedia = async (genre: string, slug: string, search: string, skip: number | undefined, limit: number | undefined) => {
        const result = await NoUser.getItem({ genre, slug, category: "", search, skip, limit, pre: "" })
        if (result.success) {
            setData(result.data)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        currentUser.position && getMedia("pic", "", "", undefined, undefined)
    }, [currentUser.position, refresh])

    const getFile = async (e: any) => {
        var files = e.target.files;
        const file: File = files[0]
        var reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async function () {
            setLoading(true)
            const result = currentUser.position && await UserAuthen.uploadFile(currentUser.position, file, "pic")
            if (result) {
                setLoading(false)
                setRefresh(n => n + 1)
            }
        }
    }

    const [i, setI] = useState<number>(-1)
    return (
        <div>
            <div style={{ display: "flex", maxWidth: "1200px", margin: "10px auto" }}>

                {loading ?
                    <UploadButton
                        icon={<PendingIcon className='bg30px' />}
                        func={(e) => { }}
                    />
                    : <UploadButton
                        icon={<AddPhotoAlternateIcon className='bg30px svg_hover' />}
                        func={(e) => getFile(e)}
                    />}
            </div>
            <div className='grid_box light1' style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", borderRadius: "5px", boxShadow: "0px 0px 2px #888" }}>
                {
                    data.map((item, index) =>
                        <div key={index} className='xs6 sm4 md3 lg2 grid_child pd-5px br-5px zi-3 ' >
                            <div style={{ padding: "5px" }}>
                                <div className='ps-re' style={{
                                    overflow: "auto",
                                    position: "relative", aspectRatio: "1", width: "100%", cursor: "pointer", transition: "all 0.25s", borderRadius: "5px",

                                }}>
                                    <Image quality={100} src={process.env.FTP_URL + "img/shift/" + item.name} sizes='100%' fill alt=""
                                        style={{
                                            objectFit: "cover",
                                            transition: "all 0.25s",
                                        }}
                                        onClick={() => setI(index)} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {i !== -1 && <ImageModalDetail item={data[i]} func={() => setI(-1)} deletePic={() => { setI(-1), setRefresh(n => n + 1) }} />}
        </div >
    )
}

export default Page