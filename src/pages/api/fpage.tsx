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

    connectMongoDB()

    switch (method) {
        case "GET":
            await fpageModel
                .find(query.pre ? { "genre": query.pre } : {})
                .find(query.slug ? { "slug": query.slug } : {})
                .find(query.search ? { "title": { $regex: query.search } } : {})
                // .sort({ "editDate": -1 })
                .sort(query.sort === "editDate" ? { "editDate": -1 } : { "createDate": -1 })
                // .sort(query.sort === "title" ? { "title": -1 } : {})
                .skip(query.skip)
                .limit(query.limit ? query.limit : {})
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

}