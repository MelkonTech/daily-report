const mongoose = require('mongoose')
const Schema = mongoose.Schema
const reportSchema = new Schema(
    {
        author : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
        description:{type:String, default:'' },
        estimation:{type:Number },
        spent:{type:Number },
        isAccepted:{type:Boolean,default:false}
    },{
        timestamps:true
    }
)

const Report = mongoose.model('Report', reportSchema)

module.exports = Report