const mongoose = require('mongoose')

const newsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is mandatory']
        },
        uploadDate: {
            type: String,
            required: [true, 'Date is mandatory']
        },
        content: {
            type: String,
            required: [true, 'Content is mandatory']
        },
        expireDate: {
            type: String,
            required: [true, 'Date is mandatory']
        },
        canBeRemoved: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const New = mongoose.model('New', newsSchema)

module.exports = New;