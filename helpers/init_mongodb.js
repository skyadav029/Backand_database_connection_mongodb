const mongoose= require('mongoose')
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    UseUnifiedTopology:true,
    //useCreateIndex:true,
})
.then(()=>{
    console.log("mongodb is connected");

})
.catch(err=>console.log(err.message))

mongoose.connection.on('connected',()=>{
    console.log("Mongoose conecected to db")
})
mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})
mongoose.connection.on('disconnected',()=>{
    console.log("Mongoose conecection is disconnect to db")
})
process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})
