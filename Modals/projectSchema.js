const mongoose = require("mongoose"); //1

//create schme 4
const projectSchema = mongoose.Schema({
       title:{
              type:String,
              require:true
       },
       Language:{
              type:String,
              require:true
       },
       github:{
              type:String,
              require:true
       },
       website:{
              type:String,
              require:true
       },
       overview:{
              type:String,
              require:true
       },
       projectImage:{
              type:String,
              require:true
       },
       userId:{
              type:String,
              require:true
       }


})



//create model 2
const project = mongoose.model('projects',projectSchema)

//export 3
module.exports =project