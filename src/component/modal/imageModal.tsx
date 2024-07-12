'use client'
import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import UploadButton from '@/component/input/uploadButton'
import store from '@/redux/store'
import { UserAuthen } from '@/api/UserAuthen'
import Image from 'next/image'
import NoUser from '@/api/noUser'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PendingIcon from '@mui/icons-material/Pending';
import CheckIcon from '@mui/icons-material/Check';
type Props = {
    modalOpen?: boolean
    onCanel?: () => void
    onSubmit?: (id: string) => void
}

const ImageModal = ({ modalOpen, onCanel, onSubmit }: Props) => {

    const [loading, setLoading] = useState<boolean>(false)

    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [refresh, setRefresh] = useState<number>(0)

    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
    }
    useEffect(() => {
        update()
    })
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


    const [selectImageId, setSelectImageId] = useState<string>("")

    return (
        <div className='bg-drop'
            style={{ display: modalOpen ? "block" : "none", overflow: "auto", position: "fixed", height: "100vh", width: "100%", top: 0, left: 0, zIndex: 2, padding: "30px 5px 0" }}>
            <CloseIcon className="bg30px svg_hover" onClick={() => onCanel && onCanel()} style={{ position: "absolute", top: "5px", right: "20px", zIndex: 2, cursor: "pointer" }} />
            <div className='grid_box bg-drop' style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", borderRadius: "5px" }}>
                {
                    data.map((item, index) =>
                        <div key={index} className='xs6 sm4 md3 lg2 grid_child pd-5px br-5px zi-3 ' >
                            <div style={{ padding: "5px" }}>
                                <div className='ps-re' style={{
                                    overflow: "auto",
                                    position: "relative", aspectRatio: "1", width: "100%", cursor: "pointer", transition: "all 0.25s", borderRadius: "5px",
                                    opacity: loading ? "0.25" : selectImageId.toString() === item._id.toString() ? 1 : 0.75,
                                    border: selectImageId.toString() === item._id.toString() ? "2px solid #aaa" : "1px solid #888"

                                }}>
                                    <Image quality={100} src={process.env.FTP_URL + "img/shift/" + item.name} sizes='100%' fill alt=""
                                        style={{
                                            objectFit: "cover",
                                            transition: "all 0.25s",
                                        }}
                                        onClick={() => setSelectImageId(i => i.toString() !== item._id.toString() ? item._id : "")} />
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
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
                <div style={{ width: "max-content ", margin: "auto 5px" }}>
                    <CheckIcon className="bg30px svg_hover" onClick={() => onSubmit && onSubmit(selectImageId)} style={{ cursor: "pointer" }} />
                </div>
            </div>
        </div >
    )
}

export default ImageModal