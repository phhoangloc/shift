import { NextApiRequest, NextApiResponse } from "next"
import { userModel } from "@/model/user.model"
import connectMongoDB from "@/connect/database/mogoseDB"


const jwt = require('jsonwebtoken')

const Auth =
    async (
        req: NextApiRequest,
        res: NextApiResponse
    ) => {
        connectMongoDB()
        let body: any = { success: false };
        const authorization = req.headers['authorization']
        const token = authorization && authorization.split(" ")[1]
        try {
            const result = await jwt.verify(token, 'secretToken')
            await userModel.findOne({ "_id": result.id }, "_id nickname")
                .then((result: any) => {
                    body.success = true
                    body.message = "login success"
                    body.data = result
                    res.json(body)
                })
        } catch (errors) {
            body.success = false
            body.message = "login failed"
            res.json(body)
        }

    }


export default Auth