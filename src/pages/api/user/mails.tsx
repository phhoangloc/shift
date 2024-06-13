import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB'
import { NewModel } from '@/model/news.model'
import { mailModel } from '@/model/mail.model'
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const Imap = require('node-imap');
const { simpleParser } = require('mailparser');
const inspect = require('util').inspect;

var imap = new Imap({
    user: 'h-loc@astem-co.co.jp',
    password: 'zkwe vmxt gkxc ixts',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
});

export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'h-loc@astem-co.co.jp',
        pass: 'zkwe vmxt gkxc ixts'
    },
});

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
            case "GET":
                const openInbox = (cb: any) => {
                    imap.openBox('INBOX', true, cb)
                }
                await imap.once('ready', async function () {
                    openInbox(async function (err: Error, box: any) {

                        if (err) throw err;

                        const start: number = query.id ? Number(query.id) : box.messages.total - (Number(query.page) * Number(query.limit))
                        const end: number = query.id ? Number(query.id) : box.messages.total - (Number(query.page) * Number(query.limit)) - Number(query.limit) + 1
                        var f = imap.seq.fetch(
                            start + ":" + end,
                            {
                                bodies: '',
                                struct: true
                            });

                        f.on('message', function (msg: any, seqno: any) {
                            msg.on('body', async function (stream: any, info: any) {
                                simpleParser(stream, (err: Error, parsed: any) => {

                                    if (err) throw err;
                                    item = {
                                        id: seqno,
                                        subject: parsed.subject,
                                        email: parsed.from.text,
                                        content: parsed.html || parsed.textAsHtml,
                                        date: parsed.date
                                    }
                                    // data = [...data, item]

                                    data = [...data.filter(d => d.subject !== item.subject && "Re:" + d.subject !== item.subject), item]
                                });
                            });

                            msg.once('end', function () {
                                item = {}
                            });

                        });
                        f.once('error', function (err: Error) {
                            console.log('Fetch error: ' + err);
                        });
                        f.once('end', async () => {
                            imap.end()
                        })
                    })
                })
                await imap.once('error', async function (err: Error) {
                    console.log(err);
                });
                await imap.once('end', () => {
                    result.success = true
                    result.name = 'メール'
                    result.data = data.reverse()
                    res.json(result)
                });

                imap.connect()

                break
            case "POST":
                const mainOptions = {
                    from: 'SHIFT <no-reply>',
                    to: req.body.email,
                    subject: req.body.title,
                    html: req.body.content
                };

                await transporter.sendMail(mainOptions)
                    .catch((error: Error) => {
                        result.success = false
                        result.message = error.message
                        res.send(result)
                        throw error.message
                    }).then(async () => {
                        result.success = true
                        res.json(result)
                    })
                break

            case "PUT":
                await mailModel
                    .updateOne({ "_id": query.id }, body)
                    .catch((error: Error) => {
                        res.json(result)
                        throw error.message
                    })
                    .then(() => {
                        result.success = true
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