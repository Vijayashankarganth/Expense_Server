const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userImageSchema=new Schema({
    image:{
        data:Buffer,
        contentType:'image/png'
    }
})

const userImage = mongoose.model('userImage',userImageSchema)

exports.module = userImage