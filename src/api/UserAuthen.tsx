
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
export const UserAuthen = {
    checkLogin, createItem, editItem, getMail, getMailById, sendMail
}