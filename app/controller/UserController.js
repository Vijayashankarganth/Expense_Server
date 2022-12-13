const User = require('../model/user')
const Budget=require('../model/budget')
const {omit}=require('lodash')
const jwt=require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const UserController={}

UserController.register=(req,res)=>{
    const body=req.body
    const user = new User(body)
    user.save()
        .then((user)=>{
            const budget =new Budget({userId:user._id})
            budget.save()
                  .then(()=>{
                       res.json('Successfully Register')
                  })
                  .catch((error)=>{
                    res.json(error)
                  })
          
        })
        .catch((error)=>{
            res.json({error})
        })
}

UserController.login=(req,res)=>{
    const body = req.body
    User.findOne({email:body.email})
        .then((user)=>{
           
            if(user){
                bcryptjs.compare(body.password,user.password)
                        .then((matched)=>{
                      
                            if(matched){
                                const tokenData={
                                    _id:user._id,
                                    name:user.profile.name,
                                    email:user.email
                                }
                            const token=jwt.sign(tokenData,process.env.JWT_KEY)
                            res.json({token})
                            }
                            else{
                                res.json({error:"invalid email or password"})
                            }
                            
                        })
            }
            else{
                res.json({error:"invalid email or password"})
            }
        })
}

UserController.list=(req,res)=>{
    const id=req.tokenData._id
    User.findOne({_id:id})
        .then((user)=>{
            const responseUser=JSON.parse(JSON.stringify(user))
            res.json(omit(responseUser,['password','_id','updatedAt']))
        })
        .catch((error)=>{
            res.json(error)
        })
}

UserController.upload=(req,res)=>{
  const id = req.tokenData._id
  const url = req.file.path

  User.findOneAndUpdate({_id:id},{picture:url},{new:true})
    .then((user)=>{
        res.json(user) 
    })
    .catch((error)=>{
        res.json(error)
    })
} 

module.exports=UserController