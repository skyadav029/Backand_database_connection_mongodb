const express= require('express')
const morgan=require('morgan')
const creatError=require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const AuthRoute=require('./Routes/Authroute')
const app=express()

app.use(morgan('dev'))
app.use(express.json())    // that is json formate data 
app.use(express.urlencoded({extended:true})) // that is form data type
app.get('/',async(req,res,next)=>{
  
    res.send("hello from express");
})
app.use('/auth',AuthRoute)
app.use(async(req,res,next)=>{
 
    // const error= new Error("NOT found")
    // error.status=404
    // next(error)
    next(creatError.NotFound('this  route does not exist'))
})
// this is error handlor
app.use((err,req,res,next)=>{
    res.status(err.status|| 500)
    res.send({
        error:{
            status:err.status|| 500,
            message:err.message,
        },
    })
})



const PORT=process.env.PORT|| 6000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})