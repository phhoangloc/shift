import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB'
import { StaffModel } from '@/model/staff.model'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const query = req.query
    const method = req.method
    const body = req.body
    const result: any = { success: false }
    connectMongoDB()

    switch (method) {
        case "GET":
            await StaffModel
                .find(query.pre ? { "genre": query.pre } : {})
                .find(query.slug ? { "slug": query.slug } : {})
                .find(query.category ? { "category": query.category } : {})
                .find(query.search ? { "title": { $regex: query.search } } : {})
                .sort(query.sort === "createDate" ? { "createDate": -1 } : {})
                .sort(query.sort === "editDate" ? { "editeDate": -1 } : {})
                .sort({ "editDate": -1 })
                .sort({ "createDate": -1 })
                .skip(query.skip)
                .limit(query.limit ? query.limit : {})
                .populate('cover')
                .catch((error: Error) => {
                    res.json(result)
                    throw error.message
                })
                .then((data: any) => {
                    result.success = true
                    result.name = "スタッフ"
                    result.data = data
                    res.json(result)
                })
    }
}