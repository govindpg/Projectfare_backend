//logics to resolve the reuqest
//logic for register
//import model
const users = require('../Modals/userSchema')

//import jwt
const jwt =require('jsonwebtoken')

exports.register =async(req,res)=>{
       


       console.log("inside controller register function");
       //extract data from request body it can be destructered becuase .json() is in index.js 
       const {username,email,password} = req.body;
           try {const existUser=   await users.findOne({email}) // this users is model
            if(existUser){
              res.status(406).json('account alredy exists please login') //unprocessd error
            }else{
              //create an object for the model
              const newUser= new users({  //new is object 
                     username,
                     email,
                     password,
                     github:"",
                     linkedin:"",
                     profile:""
              })
              //save function in monggose  to permantly store data in mongofdb
              await newUser.save()

              //response
              res.status(200).json(newUser) 

            }
       

     

}
catch(err){
       console.log('register request failed due to ',err);
}
}


exports.login =async(req,res)=>{
       console.log('inside controller login function');

       const {email,password}=req.body

      try {const existingUser= await users.findOne({email,password})
       console.log(existingUser);

       if(existingUser){
              const token =jwt.sign({userid:existingUser._id},"screte123")

              res.status(200).json({existingUser,token})
       }
       else{
              res.status(406).json('incorrect username or password')
       }} catch(err){
              res.status(401).json(`login failed due to ${err}`)
       }

}


//edit profile
exports.editUser =async(req,res)=>{
       const userId =req.payload
       const{username,email,password,github,linkedin,profile}=req.body

       const profileImage = req.file?req.file.filename:profile

       try {
              const updateUser = await users.findByIdAndUpdate({_id:userId},{username,email,password,github,linkdin,profile:profileImage})

              await updateUser.save()
              res.status(200).json(updateUser)
              
       } catch (err) {
              res.status(401).json(err)
              
       }
}








//we are using mv architrure so we seing logic in cintroller