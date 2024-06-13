import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB'
import { fpageModel } from '@/model/fpage.model'
const jwt = require('jsonwebtoken')


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const query = req.query
    const method = req.method
    const body = req.body
    let result: any = { success: false };

    const authorization = req.headers['authorization']
    const token = authorization && authorization.split(" ")[1]
    const id = token && await jwt.verify(token, 'secretToken').id

    var item: any = {}
    var data: any[] = []
    connectMongoDB()

    if (id) {
        switch (method) {
            case "POST":
                await fpageModel
                    .create(body)
                    .catch((error: Error) => {
                        res.json(result)
                        throw error.message
                    })
                    .then((data: any) => {
                        result.success = true
                        result.name = "固定ページ"
                        result.data = data
                        res.json(result)
                    })
                break

            case "PUT":
                await fpageModel
                    .updateOne({ "_id": query.id }, body)
                    .catch((error: Error) => {
                        res.json(result)
                        throw error.message
                    })
                    .then((data: any) => {
                        result.success = true
                        result.name = "固定ページ"
                        result.data = data
                        res.json(result)
                    })
                break

        }
    } else {
        result.success = false
        result.message = "you haven't logged in yet"
        res.json(result)
    }
}