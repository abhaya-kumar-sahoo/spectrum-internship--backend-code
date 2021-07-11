const mongoose= require('mongoose');
const jwt=require('jsonwebtoken');
const userSchema= mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  },
  rollnumber:{
    type:String,
    required:true
  },

  branch:{
    type:String,
    required:true

  },
  section:{
    type:String,
    required:true
  },

  semester:{
    type:String,
    required:true

  },
  hashPassword:{
    type:String,
    required:true
  },
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
]
})

userSchema.methods.generateAuthToken= async function(){
  try{
let token=jwt.sign({_id:this._id}, "kfhjvbbfkkf")

this.tokens= this.tokens.concat({token:token})
await this.save()
return token;
console.log(token)
  }catch(err){ 
    console.log(err)
  }
} 

 const User=mongoose.model("Spectrum",userSchema);

module.exports= User;