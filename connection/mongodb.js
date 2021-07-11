const mongoose=require("mongoose")
const db= process.env.URI
mongoose.connect("mongodb://127.0.0.1:27017/PROFILE", {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}, (err) => { 
  if (!err) { 
    console.log('MongoDB Connection Succeeded.'.cyan.bold);
  } else {
    console.log('Error in DB connection : ' + err);
  }  
});  