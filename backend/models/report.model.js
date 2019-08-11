const mongoose = require('mongoose')
const Schema = mongoose.Schema
let User = require('./user.model')

const reportSchema = new Schema(
    {
        author : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
        description:{type:String, default:'' },
        estimation:{type:Number },
        spent:{type:Number },
    },{
        timestamps:true
    }
)

const Report = mongoose.model('Report', reportSchema)

module.exports = Report