//1 import multer

const multer = require('multer')


const storage =multer.diskStorage({ //diskstoarge is funxtion used create a storage
       destination:(req,file,callback)=>{ //uploaded file is in file ,call back whrer to store the data
              callback(null,'./uploads')//the file will be stored in the uploads folder ,err vrumpo nullor error and storage
       },
       filename:(req,file,callback)=>{ // filename to create
              const filename = `image-${Date.now()}-${file.originalname}`
              callback(null,filename) // callback is used to get the file name
       }
})

const fileFilter =(req,file,callback)=>{
       if(file.mimetype ==='image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
              callback(null,true);
       }else{
              callback(null,false)
              return callback(new Error('only png,jpg,jpeg files are allowed'))
       }
}

//2.config
const multerConfig =multer({
       storage, // where the file is stored
       fileFilter //which all files cn stored
})

module.exports = multerConfig