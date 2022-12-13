const Expense = require('../model/expense')
const ExpenseController={}

ExpenseController.create=(req,res)=>{
    const {title,amount,expenseDate,categoryId} = req.body
    const userId=req.tokenData._id
    const data = {title,amount,expenseDate,userId,categoryId}
    const expense=new Expense(data)
    expense.save()
           .then((expense)=>{
                Expense.findOne({_id:expense._id}).populate('categoryId')
                        .then((response)=>{
                           res.json(response)
                        })
                
           })
           .catch((error)=>{
            res.json(error)
           })
}

ExpenseController.list=(req,res)=>{
    const id = req.tokenData._id
    Expense.find({userId:id}).populate('categoryId')
           .then((expense)=>{
                res.json(expense)
           })
           .catch((error)=>{
                res.json(error)
           })
}

ExpenseController.update=(req,res)=>{
     const id= req.params.id
     const body=req.body
     const userId=req.tokenData._id
     const action = req.query.action;

     if(action === 'delete'){
      Expense.findOneAndUpdate({_id:id, userId},{isDeleted:true},{new:true}).populate('categoryId')
             .then((expense)=>{
               res.json(expense)
             })
             .catch((error)=>{
               res.json(error)
             })
     }
     else if(action === 'restore'){
      Expense.findOneAndUpdate({_id:id, userId},{isDeleted:false},{new:true}).populate('categoryId')
            .then((expense)=>{
            res.json(expense)
            })
            .catch((error)=>{
               console.log(error)
            res.json(error)
            })
     }
     else if(action === 'update'){
      Expense.findOneAndUpdate({_id:id,userId:userId},body,{new:true}).populate('categoryId')
      .then((expense)=>{
         res.json(expense)
      })
      .catch((error)=>{
         res.json(error)
      })
     }
    
}

ExpenseController.delete=(req,res)=>{
     const userId = req.tokenData._id
     const id=req.params.id
     Expense.findOneAndDelete({_id:id, userId})
            .then((expense)=>{
               res.json(expense)
            })
            .catch((error)=>{
               res.json(error)
            })
}
module.exports=ExpenseController