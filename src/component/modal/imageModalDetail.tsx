import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../input/button';
import store from '@/redux/store';
import { setAlert } from '@/redux/reducer/alertReducer';
import { AlertType } from '@/redux/reducer/alertReducer';
import { UserAuthen } from '@/api/UserAuthen';
type Props = {
    item?: any,
    func?: () => void,
    deletePic?: () => void,
}

const ImageModalDetail = ({ item, func, deletePic }: Props) => {
    const [currentUser, setCurrentUser] = useState<any>(store.getState().user)
    const [currentAlert, setCurrentAlert] = useState<AlertType>(store.getState().alert)
    const update = () => {
        store.subscribe(() => setCurrentUser(store.getState().user))
        store.subscribe(() => setCurrentAlert(store.getState().alert))

    }
    useEffect(() => {
        update()
    })

    const [id, setId] = useState<string>("")
    const [isCopy, setIsCopy] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)

    useEffect(() => {
        setIsCopy(false)
    }, [item])

    const deleteImage = async (id: string) => {
        store.dispatch(setAlert({ value: false, msg: "do you want to delete this picture", open: true }))
        setIsDelete(true)
        setId(id)
    }
    useEffect(() => {
        if (currentAlert.value && isDelete) {
            const deleteImage = async (p: string, a: string, id: string) => {
                const result = await UserAuthen.deleteItem(p, a, id)
                if (result) {
                    setIsDelete(false)
                    store.dispatch(setAlert({ value: false, msg: "", open: false }))
                    deletePic && deletePic()
                }
            }
            currentUser.position && id && deleteImage(currentUser.position, "pic", id)
        }
    }, [currentAlert, currentUser, isDelete, id])
    return (
        item?._id &&
        <div className='bg-drop' style={{
            position: "fixed",
            width: "100%",
            height: "100vh",
            top: 0,
            left: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "5px"
        }}>
            <div className="light1 grid_box"
                style={{
                    display: "flex",
                    width: "100%",
                    maxWidth: "992px",
                    margin: "5px auto",
                    padding: "10px",
                    borderRadius: "5px",
                    position: "relative"
                }}>
                <CloseIcon className="svg30px svg_hover" style={{ position: "absolute", right: "5px" }} onClick={() => func && func()} />
                <div className='xs12' style={{ height: "40px" }}>
                </div>
                <div className="xs12 md6" style={{ padding: "5px" }}>
                    <div className='bg-drop' style={{ position: "relative", height: "98%", borderRadius: "5px", overflow: "hidden", margin: "auto", width: "100%", textAlign: "center", border: "1px solid #aaa" }}>
                        <Image quality={100} src={process.env.FTP_URL + "img/shift/" + item.name} alt="" width={500} height={500} priority
                            style={{
                                width: "100%",
                                maxWidth: "500px",
                                height: "auto",
                            }}
                        />
                    </div>
                </div>
                <div className="xs12 md6" style={{ padding: "5px" }}>
                    <div style={{ margin: "5px" }}>
                        <h4 style={{ margin: "5px 0" }}>名前</h4>
                        <div style={{ border: "1px solid", height: "40px", lineHeight: "40px", padding: "0px 5px", borderRadius: "5px" }}>{item.name}</div>
                    </div>
                    <div style={{ margin: "5px" }}>
                        <h4 style={{ margin: "5px 0" }}>link</h4>
                        <div style={{ display: "flex", border: "1px solid", height: "40px", lineHeight: "40px", padding: "0px 5px", borderRadius: "5px", justifyContent: "space-between" }}  >
                            <p style={{ width: "100%", textWrap: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {process.env.FTP_URL + "img/shift/" + item.name} </p>
                            {isCopy ? <LibraryAddCheckIcon className='svg30px' /> : <ContentCopyIcon className='svg30px svg_hover' onClick={() => { navigator.clipboard.writeText(process.env.ftp_url + "locand/" + item.name); setIsCopy(true) }} />}
                        </div>
                    </div>
                    <div className='xs12 title-hover' style={{ width: "max-content", height: "40px", margin: "10px 0 0 auto" }}>
                        <Button name="削除" onClick={() => deleteImage(item._id)} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ImageModalDetail