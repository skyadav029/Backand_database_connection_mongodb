const jwt= require('jsonwebtoken')
const creatError=require('http-errors')



// export cuple of function
module.exports =  {
    // predefined function 
    signAccessToken:(userId)=>{
        return new Promise((resolve,reject) => {
            const payload={
               
               
            }
            const secret=process.env.ACCESS_TOKEN_SECRET
            const option={
                expiresIn:"1h",
                issuer:"pickurage.com",
            audience:userId
            };
            jwt.sign(payload,secret,option,(err,token)=>{
                if(err)reject(err)
                resolve(token)
            })
        })
    }
}

