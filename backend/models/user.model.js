const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
let Report = require('./report.model')

const userSchema = new Schema(
    {
        name: { type:String,trim:true},
        email: { type:String, required:true,minlength:6,trim:true, lowercase:true,index: true,unique: true},
        password: {type:String, required:true ,trim:true},
        type:{type:String, default:'Developer' },
        reports : [{ type: Schema.Types.ObjectId, ref: 'Report' }]
    },{
        timestamps:true
    }
)
userSchema.methods.generateHash = function(password){
     return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null) 
}
userSchema.methods.validPassword = (password,hash) => { 
    console.log(password,hash)
    bcrypt.compare(password, hash)
        .then(isMatch => {return isMatch})
}

const User = mongoose.model('User', userSchema)

module.exports = User