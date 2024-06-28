const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema({
    genre: {
        type: String,
        default: "staff"
    },
    title: {
        type: String,
    },
    cover: {
        type: Schema.Types.ObjectId,
        ref: "image"
    },
    slug: {
        type: String,
    },
    position: {
        type: String,
        default: "社員"
    },
    content: {
        type: String,
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    editDate: {
        type: Date,
        default: Date.now,
    },
})

export const StaffModel = mongoose.models.staff || mongoose.model('staff', staffSchema)