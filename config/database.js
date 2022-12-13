const mongoose = require('mongoose')

const ConfigueDb=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/pro-001')
            .then((response)=>{
                console.log('db connected')
            })
            .catch((error)=>{
                console.log(error.message)
            })
}

module.exports = ConfigueDb