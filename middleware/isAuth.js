const jwt = require('jsonwebtoken')

exports.isAuth = (req,res,next)=>{
    const token = req.headers['authorization']
    if(token){
        try{
            var authData = jwt.verify(token,'remah')
            req.user = authData.user
            next()   
        } catch(err){
            res.json(err)
        }
    } else {
        res.status(403).json({
            msg : "FOR bidden"
        }) 
    }
}