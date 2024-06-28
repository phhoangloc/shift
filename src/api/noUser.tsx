import axios from "axios"

type Query = {
    genre: string,
    slug?: string,
    category?: string,
    search?: string
    skip?: number,
    limit?: number,
    pre?: string,
    sort?: string,
}
const login = async (body: { username: string, password: string }) => {
    const result = await axios.post("/api/login", body)
    return result.data
}
const signup = async (body: { username: string, password: string, email: string }) => {
    const result = await axios.post("/api/signup", body, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return result.data
}

const getModel = async () => {
    const result = await axios.get("/api/model")
    return result.data
}
const getItem = async ({ genre, slug, category, search, skip, limit, pre, sort }: Query) => {
    const result = await axios.get(`/api/${genre}?slug=${slug ? slug : ""}&&category=${category ? category : ""}&&search=${search ? search : ""}&&skip=${skip ? skip : 0}&&limit=${limit ? limit : ""}&&pre=${pre ? pre : genre}&&sort=${sort ? sort : ""}`)
    return result.data
}
const getPicById = async (id: string) => {
    const result = await axios.get(`api/pic?id=${id}`)
    return result.data
}
const createMail = async (body: any) => {
    const result = await axios.post(`/api/mails/`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage && localStorage.token
        },
    })
    return (result.data)
}
const NoUser = {
    login, signup, getItem, getModel, createMail, getPicById
}

export default NoUser