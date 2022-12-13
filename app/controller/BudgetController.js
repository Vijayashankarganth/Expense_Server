const Budget = require('../model/budget')

const BudgetController={}

BudgetController.update=(req,res)=>{
    const body=req.body
    const userId = req.tokenData._id
    
    Budget.findOneAndUpdate({userId:userId,},body,{new:true})
          .then((budget)=>{
            res.json(budget)
          })
          .catch((error)=>{
            res.json(error)
          })
}

BudgetController.list=(req,res)=>{
    const id = req.tokenData._id
    
    Budget.findOne({userId:id})
         .then((budget)=>{
            res.json(budget)
         })
         .catch((error)=>{
            res.json(error)
         })
}
module.exports = BudgetController 