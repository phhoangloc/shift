const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fpageSchema = new Schema({
    genre: {
        type: String,
        default: "fpage"
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
    createDate: {
        type: Date,
        default: Date.now,
    },
})

export const fpageModel = mongoose.models.fpage || mongoose.model('fpage', fpageSchema)