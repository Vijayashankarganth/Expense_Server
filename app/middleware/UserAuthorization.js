const jwt=require('jsonwebtoken')


const UserAuthorization=(req,res,next)=>{
    
    const token = req.header('X-Auth')
    let tokenData
    try{
        tokenData=jwt.verify(token,process.env.JWT_KEY)
        req.tokenData = tokenData
        next()
    }
    catch(error){
        res.json(error.message)
    }

}

module.exports = UserAuthorization