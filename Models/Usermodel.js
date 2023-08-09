const mongoose= require('mongoose');
const Schema= mongoose.Schema
const bcrypt=require('bcrypt');
const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,  // because abc and ABC are same in email case
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

UserSchema.pre('save',async function (next){
    try {
        // to hash the password
        const salt=await bcrypt.genSalt(10)
       // console.log(this.email,this.password)// this give result is email  password
       const hashedPassword=await bcrypt.hash(this.password,salt) // this is change in **** formate
        this.password=hashedPassword
        next()// because this is middleware
       

    } catch (error) {
        next(error)
    }

})

UserSchema.method.comparePassword=async function(password){
    try {
       return  await bcrypt.compare(password,this.password) //this return true or false pasword match or not
    } catch (error) {
       throw error 
    }
}
const User=mongoose.model('user',UserSchema)
module.exports=User