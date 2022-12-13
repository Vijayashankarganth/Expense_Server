const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    expenseDate:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const Expense= mongoose.model('Expense',expenseSchema)
module.exports = Expense