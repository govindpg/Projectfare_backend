const jwt = require('jsonwebtoken')

const jwtMiddleware =(req,res,next)=>{
       console.log("inside middleware");
       

       try{
              const token =req.headers['authorization'].split(' ')[1]
       console.log(token);
              const jwtResponse = jwt.verify(token,"screte123") // token and sectre key
              console.log(jwtResponse);
              req.payload=jwtResponse.userid
              next()

       }catch(err){
              res.status(401).json('authorization failed..please login again')
       }



     
}

module.exports = jwtMiddleware