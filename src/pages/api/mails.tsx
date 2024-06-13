import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB'
import { NewModel } from '@/model/news.model'
import { mailModel } from '@/model/mail.model'
import { transporter } from './user/mails'
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
            result.success = false
            res.json(result)
            break
        case "POST":
            const mainOptions = {
                from: '問い合わせ<no-reply>',
                to: "h-loc@astem-co.co.jp",
                subject: req.body.title,
                html: `
                <div>
                <h4>名前: ${req.body.name}</h4>
                <p>eメール: ${req.body.email}</p>
                <p>問い合わせタイプ: ${req.body.request}</p>
                <p>タイトル: ${req.body.title}</p>
                <p>電話番号: ${req.body.phone}</p>
                </div>
                ${req.body.content}`
            };
            const clientOptions = {
                from: 'SHIFT<no-reply>',
                to: req.body.email,
                subject: "お問い合わせを送信しました",
                html: `
                <div>
                SHIFT に問い合わせを送信しました。
                </div>
                ----
                <p>問い合わせタイプ: ${req.body.request}</p>
                <p>タイトル: ${req.body.title}</p>
                <p>電話番号: ${req.body.phone}</p>
                <p>内容: </p>
                ${req.body.content}`
            };

            await transporter.sendMail(mainOptions)
                .catch((error: Error) => {
                    result.success = false
                    result.message = error.message
                    res.send(result)
                    throw error.message
                }).then(async () => {
                    await transporter.sendMail(clientOptions)
                    result.success = true
                    res.json(result)
                })
            break
    }
}