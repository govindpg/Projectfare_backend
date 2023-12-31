//import mongoose
 const mongoose  = require('mongoose')

 //get the connection string
 const connectionString = process.env.DATABASE

 //connect server with mongodb
 mongoose.connect(connectionString).then(()=>{
       console.log('server is connected sucessfuly with mongodb');
 }).catch((err)=>{
       console.log("somwthing went wrong due to "+err);
 })