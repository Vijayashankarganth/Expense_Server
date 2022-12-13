const express = require('express')
const router = express.Router()

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const UserController = require('../app/controller/UserController')
const CategoryController=require('../app/controller/CategoryController')
const ExpenseController=require('../app/controller/ExpenseController')
const BudgetController = require('../app/controller/BudgetController')
const UserAuthorization=require('../app/middleware/UserAuthorization')



router.post('/api/user/register',UserController.register)
router.post('/api/user/login',UserController.login)
router.get('/api/user/detail',UserAuthorization,UserController.list)
router.put('/api/user/update',UserAuthorization,upload.single('image'),UserController.upload)


router.post('/api/user/category',UserAuthorization ,CategoryController.create)
router.get('/api/user/category/list',UserAuthorization,CategoryController.list)
router.put('/api/user/category/update/:id',UserAuthorization,CategoryController.update)
router.delete('/api/user/category/delete/:id',UserAuthorization,CategoryController.delete)

router.post('/api/user/expense',UserAuthorization,ExpenseController.create)
router.get('/api/user/expense/list',UserAuthorization,ExpenseController.list)
router.put('/api/user/expense/update/:id',UserAuthorization,ExpenseController.update)
router.delete('/api/user/expense/delete/:id',UserAuthorization,ExpenseController.delete)

router.put('/api/user/budget/update',UserAuthorization ,BudgetController.update)
router.get('/api/user/budget/list',UserAuthorization,BudgetController.list)

module.exports = router