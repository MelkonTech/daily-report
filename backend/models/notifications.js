const mongoose = require('mongoose')
const Schema = mongoose.Schema
const notificationSchema = new Schema(
    {
        report : { type: mongoose.Schema.Types.ObjectId, ref: 'Report', required:true },
        description:{type:String, default:'' },
        estimation:{type:Number },
        spent:{type:Number },
        isAccepted:{type:Boolean,default:''}
    },{
        timestamps:true
    }
)

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification