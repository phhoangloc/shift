import type { NextApiRequest, NextApiResponse } from 'next'
import connectMongoDB from '@/connect/database/mogoseDB';
const mongoose = require('mongoose');

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectMongoDB()
    const db = await mongoose.connection;
    const collections = await db.db?.listCollections().toArray()
    const modelName = collections?.map((col: any) => col.name)
    res.json(modelName)
}