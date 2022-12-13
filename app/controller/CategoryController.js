const Category = require('../model/category')
const Expense = require('../model/expense')
const CategoryController={}

CategoryController.create=(req,res)=>{
    const name = req.body.name
    const userId = req.tokenData._id
    const category = new Category({name,userId})
    category.save()
            .then((category)=>{
                res.json(category)
            })
            .catch((error)=>{
                res.json(error)
            })
}

CategoryController.list=(req,res)=>{
    const id = req.tokenData._id
    Category.find({userId:id})
            .then((category)=>{
                res.json(category)
            })
            .catch((error)=>{
                res.json(error)
            })
}

CategoryController.update=(req,res)=>{
    const body = req.body
    const id=req.params.id
    const userId =req.tokenData._id
    const action = req.query.action
    
    if(action === 'delete'){
        Category.findOneAndUpdate({_id:id,userId},{isDeleted:true},{new:true}) 

        .then((category)=>{
            
            res.json(category)
        })
        .catch((error)=>{
            res.json(error)
        })
    }
    else if (action === 'restore'){
        Category.findOneAndUpdate({_id:id,userId},{isDeleted:false},{new:true})
        .then((category)=>{
            res.json(category)
        })
        .catch((error)=>{
            res.json(error)
        })
    }
    else if(action === 'update'){
        Category.findOneAndUpdate({_id:id,userId},body,{new:true})
        .then((category)=>{
            res.json(category)
        })
        .catch((error)=>{
            res.json(error)
        })
    }
   
}

CategoryController.delete=(req,res)=>{
    const id = req.params.id
    Category.findOneAndDelete({_id:id})
            .then((category)=>{
                res.json(category)
            })
            .catch((error)=>{
                res.json(error)
            })
}
module.exports = CategoryController