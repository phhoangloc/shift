
import axios from "axios"

const checkLogin = async () => {
    const result = await axios.get("/api/auth/user", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}
const getMail = async (position: string, page: number, limit: number) => {
    const result = await axios.get(`/api/${position}/mails?page=${page}&limit=${limit}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}
const sendMail = async (position: string, body: any) => {
    const result = await axios.post(`/api/${position}/mails`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}
const getMailById = async (position: string, id: number) => {
    const result = await axios.get(`/api/${position}/mails?id=${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}
const createItem = async (position: string, archive: string, body: any) => {
    const result = await axios.post(`/api/${position}/${archive}`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}

const editItem = async (position: string, archive: string, body: any, id: string) => {
    const result = await axios.put(`/api/${position}/${archive}?id=${id}`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}

const deleteItem = async (position: string, archive: string, id: string) => {
    const result = await axios.delete(`/api/${position}/${archive}?id=${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}
const uploadFile = async (p: string, file: File, type: string) => {
    const formData = new FormData()
    formData.append("file", file)
    if (type === "pic") {
        const fileUpload = await axios.post("/api/" + p + "/pic", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        })
        return fileUpload
    }
    if (type === "file") {
        const fileUpload = await axios.post("/api/" + p + "/file", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        })
        return fileUpload
    }
}
const getPicById = async (p: string, u: string) => {
    const result = await axios.get("/api/" + p + "/pic?id=" + u,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        }
    )
    return result.data
}
const deleteFile = async (p: string, genre: string, name: string, id: string) => {
    const result = await axios.delete(process.env.server_url + p + `/${genre}?name=${name}&id=${id}`,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.token,
            },
        },
    )
    return result.data
}

export const UserAuthen = {
    checkLogin, createItem, editItem, deleteItem, getMail, getMailById, sendMail, uploadFile, getPicById, deleteFile
}