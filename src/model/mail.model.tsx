const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mailSchema = new Schema({
    genre: {
        type: String,
        default: "mails"
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    title: {
        type: String,
    },
    slug: {
        type: String,
    },
    content: {
        type: String,
    },
    resend: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
})

export const mailModel = mongoose.models.mail || mongoose.model('mail', mailSchema)