const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema
const axios = require('axios')
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    profile:{
        name:{
            type:String,
            required:true,
        },
        gender:{
            type:String,
            reqiuired:true
        },
        occupation:{
            type:String,
            required:true
        },
    },
    picture:{
        type:String
    }
},{timestamps:true})

userSchema.pre('save',function(next){
    axios.get(`http://api.genderize.io?name=${this.profile.name}`)
        .then((response)=>{
            this.profile.gender=response.data.gender
            next()
        })
              
})
userSchema.pre('save',function(next){
    bcryptjs.genSalt()
            .then((salt)=>{
                bcryptjs.hash(this.password,salt)
                        .then((encrypt)=>{
                            this.password = encrypt
                            next()
                        })
            })
})
const User=mongoose.model('User',userSchema)

module.exports = User