import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB'
import { userModel } from '@/model/user.model'

const jwt = require('jsonwebtoken')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    connectMongoDB()
    const query = req.query
    const method = req.method
    const body = req.body
    let id
    let result: any = { success: false };
    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(" ")[1]
    // const id = token && await jwt.verify(token, 'secretToken').id
    if (token) {
        await jwt.verify(token, 'secretToken', async (err: Error, data: any) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    result.message = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại'
                    res.json(result);
                } else {
                    result.message = 'đăng nhập không hợp lệ, vui lòng đăng nhập lại'
                    res.json(result);
                }
            } else {
                id = data.id
                await userModel
                    .findOne({ "_id": id })
                    .catch((error: Error) => {
                        result.success = false
                        result.message = error.message
                        res.send(result)
                        throw error.message
                    }).then(async (data: any) => {
                        result.success = true
                        result.data = data
                        res.json(result)
                    })
            }
        })
    } else {
        res.send(result)
    }
}