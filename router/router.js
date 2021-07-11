const router=require("express").Router()
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');

const validator = require('validator');
require('../connection/mongodb')
const User= require("../schema/userSchema")

require('colors')


router.get('/',async(req,res)=>{
  res.send("Heloo") 
})

router.post('/signup',async(req,res)=>{
   try{
    const {name,email,phone,rollnumber,branch,section,semester, password,cpassword}=req.body;

   if(!name || !email || !phone || !rollnumber || !branch || !section || !semester || !password || !cpassword ){
     return res.status(400).json({msg:"Please Fill all the field"})
   }
    const emailValid=await validator.isEmail(email);
    if(!emailValid){
      return res.status(400).json({msg:"Email Is not Valid"})
    }
   if(password !== cpassword){
     return res.status(400).json({msg:"Password is Not Matching"})
   }
   const userFind= await User.findOne({email})
   if(userFind){
    return res.status(400).json({msg:"User already Exist"})
   }
   const hashPassword =await bcrypt.hashSync(password, 10);
   
  const newUser=await new User({name,email,phone,rollnumber,branch,section,semester,hashPassword})

  console.log(newUser)
newUser.save()
return res.status(201).json({msg:"Data Stored Successful"})


   }catch(err){

     console.log("Error Started",err.blue);
   }
})


//Login

router.post('/login',async(req,res)=>{

  try{
    const {email,password}=req.body;
    const emailFind= await User.findOne({email})
    if(!emailFind){
      return res.status(400).json({msg:"User Not Exist, Please Signup First"})
    }

   const checkPassword=await bcrypt.compareSync(password,emailFind.hashPassword);

   const token = await emailFind.generateAuthToken();
   console.log(token)
   res.cookie("jwtoken", token,{
     expires:new Date(Date.now()+ 25892000000),
     httpOnly:true
   })

   if(!checkPassword){
    return res.status(201).json({msg:"Login Failed"})

   } 
   

   return res.status(201).json({msg:"Login Successful"})
  }catch(err){
    console.log(err);
  }
})

////This is only to store cookies in web browser

router.get("/login",(req,res)=>{
  res.cookie("jwtoken",{
    expires:new Date(Date.now()+ 25892000000),
    httpOnly:true
  })
  res.send("This is Login page")
})


//Logout Page
router.get('/logout',(req,res)=>{
  res.clearCookie('jwtoken',{path:"/"})
  console.log("Logout Successful")
  res.status(200).send("Logout Page")

})
 

module.exports =  router