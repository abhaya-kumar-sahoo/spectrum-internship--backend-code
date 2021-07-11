const express = require('express');
var colors = require('colors');
const dotenv=require('dotenv')
const app=express();
const router=require('./router/router')
const port =process.env.PORT || 3000;

// dotenv.config()
// require('dotenv').config();
// dotenv.config({path:'./config.env'})
app.use(express.json())

require('./connection/mongodb')


app.use(router)


app.listen(port, (err)=>{
  console.log(`SERVER STARTED ON PORT ${port}`.brightMagenta.bold);
})