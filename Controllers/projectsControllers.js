//import model
const project = require('../Modals/projectSchema');



exports.addProject= async (req,res)=>{
       console.log('hello i am project controller');

       const  userId =req.payload
       console.log(userId);

       const projectImage= req.file.filename
       console.log(projectImage);

       const {title,Language,github,website,overview} = req.body 
       console.log(`${title},${Language},${github},${website},${overview},${projectImage}`);


      try {
       const ExisitngUser = await project.findOne({github})
       if(ExisitngUser){
              res.status(406).json("project already existed")
       }else{
              const nProject = new project({
                     title,
                     Language,
                     github,
                     website,
                     overview,
                     projectImage,
                     userId

              })
              await nProject.save()
              res.status(200).json(nProject)
       }

      } catch (err) {
       res.json(401).json(`request failed due to ${err}`)
      }


}

//to get the home project
exports.gethomeProject=async(req,res)=>{
       try {
              const homeProject =await project.find().limit(3)
       res.status(200).json(homeProject)
              
       } catch (err) {
              res.status(401).json(`request fialed due to ${err}`)
       }
}

//to get the all  project
exports.getallProject=async(req,res)=>{
       const searchkey =req.query.search
       console.log(searchkey);

       const query={
              Language:{
                     //regular expression,option :i - it removes case sensitivty
                     $regex:searchkey,$options:'i'
              }
       }

       try {
              const allProject =await project.find(query)
       res.status(200).json(allProject)
              
       } catch (err) {
              res.status(401).json(`request fialed due to ${err}`)
       }
}


//to get the user project
exports.getuserProject=async(req,res)=>{
       try {
              const userId = req.payload
              const userProjects =await project.find({userId})
       res.status(200).json(userProjects)
       console.log("in user");
              
       } catch (err) {
              res.status(401).json(`request fialed due to ${err}`)
       }
}
//edit user
exports.editUserProject=async(req,res)=>{
     const {id} =req.params 
     const userId =req.payload 
     const{title,Language,github,website,overview,projectImage}=req.body
     const uploadProjectImage = req.file?req.file.filename:projectImage

     try {
       const updateProject = await project.findByIdAndUpdate({_id:id},{title,Language,github,website,overview,projectImage:uploadProjectImage,userId},{new:true})
       await updateProject.save()
       res.status(200).json(updateProject)
     } catch (err) {
       res.status(401).json(`request failed due to ${err}`)
     }
}








//delete project
exports.deleteUserProject = async(req,res)=>{
       const {id}= req.params 
       try {
              const removeProject = await project.findByIdAndDelete({_id:id})
              res.status(200).json(removeProject)
              
       } catch (err) {
              res.status(401).json(err)
              
       }

}