const express=require('express')
const router=express.Router()

const creatError=require('http-errors')
const User=require('../Models/Usermodel')
const {authSchema}=require('../helpers/validation_scheema')

const { signAccessToken}=require('../helpers/jwt_helper')// signAccessToken method access fromjwt heler

router.post('/register',async(req,res,next)=>{
   
    //console.log(req.body)
    

    try {
         const { email,password} = req.body
       // if(!email || !password) throw creatError.Badrequest()
        const result=await authSchema.validateAsync(req.body)
        //console.log(result);
    const doesExist=await User.findOne({email:email});

    if(doesExist) throw new Error(`${email} is allready been registered`)
    
    const user= new User({email,password}) // create new user here result contain email and pasword
     const savedUser=await user.save()
   
    const accessToken=await signAccessToken(savedUser.id)
    //res.send(savedUser)
    res.send({accessToken})//  this is provide access token
   } catch (error) {
    if(error.isjoi===true) error.status=422
    //res.send(error.message);// if this line write then error come cannot set header
     console.log(error.message)
    return next(error.message);
    next(error)
   }
})
router.post('/login',async(req,res,next)=>{
  const  signin =async( req,res)=>{
    const {email,password}=req.body;
    try {
      
      const doesExist=await userModel.findOne({email:email})
      if(!doesExist){
        return res.status(400).json({message:"user not found "})
      }
      const matchpassword=await bcrypt.compare(password,doesExist.password);
      if(!matchpassword){
        return res.status(400).json({message:"Invalid credentials"});
      }
     // const token =jwt.sign({email:})
    } catch (error) {
      
    }
  }



































   /*  if some one wants to be login in your application if he/she is allready registered then

   
  try {
    // we want to validate incoming body of request in the login route use schema we use allrady
    // authschema

    //const result=await authSchema.validateAsync(req.body)
    //const user=await User.findOne({email:result.email})
    //if(!user) throw creatError.NotFound("user is not registered ")// if not get in db
    
    //const isMatch=await user.isValidPassword(result.password)
    //if(!user.comparePassword(result.password))
    //return done(null,err)
    // if(!isMatch){
     // throw creatError.Unauthorized('username/password not valid')
    // }
    res.send(result)
  } catch (error) {
    if(error.isjoi === true)
    res.send(" invalid username and passwrd") 
    //return next (creatError.BadRequest("invalid username/password"))
   
  
   
    next (error)
  } 
   */
})

router.post('/refreshtoken',async(req,res)=>{
   
    res.send('reefres-token route')
    console.log('refreshed')
})
router.delete('/logout',async(req,res,next)=>{
    res.send('Log-Out')
    console.log('you are successfully logout')
})




module.exports=router;