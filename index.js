const express = require('express')
const app =express()

const cors = require('cors')
app.use(express.json())
app.use(cors())
require('dotenv').config()
const port = 4321


app.use('/uploads',express.static('uploads'))

const ConfigueDb = require('./config/database')
ConfigueDb()

const router = require('./config/routes')
app.use(router)

app.listen(port,()=>{
    console.log('server connected to ',port )
})

