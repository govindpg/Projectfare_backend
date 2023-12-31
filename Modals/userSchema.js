//import monggose
const monggose =require('mongoose')
//schema
const userSchema = new monggose.Schema({
       username:{
              type:String,
              required:true,
              min:[3,'must be atleast three charecters,but got {value}']
       },
       email:{
              type:String,
              required:true,
              unique:true,
              validator(value){
                     if(!validator.isEmail(value)){
                            throw new Error("invalid Email")
                     }
              }
       },password:{
              type:String,
              required:true
       },github:{
              type:String
              
       },linkdin:{
              type:String
       } ,profile:{
              type:String
       }
})

//create model
const users=monggose.model("users",userSchema) //collection name ,schemea

//export model
module.exports=users