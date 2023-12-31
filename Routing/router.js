//to set path to ereso;ve request4

//1. import express

const express = require("express");


//import controller

const userController= require('../Controllers/userControllers')

//import porjects controller
const projectcontroller = require('../Controllers/projectsControllers')

//import middleware
const jwtMiddleware = require("../Middleware/jwtMiddleware");
const multerConfig = require("../Middleware/multermiddleware");

//2.create an object for router class in express module

const router = new express.Router();

//path to rseolve the request

//syntax= router.httprequest('path',()=>{})
//a.register
router.post("/user/register",userController.register); // resolving path and logic
//b.login
router.post("/user/login",userController.login)
//c.add projects
router.post('/project/add',jwtMiddleware,multerConfig.single('projectimage'),projectcontroller.addProject)

//d.home project
router.get('/project/home-project',projectcontroller.gethomeProject)

//e.all porject
router.get('/project/all-project',jwtMiddleware,projectcontroller.getallProject) //here jwt is used for verification

//f.userproject
router.get('/user/all-project',jwtMiddleware,projectcontroller.getuserProject) //here jwt is used for payload

//edit porject
router.put('/project/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectcontroller.editUserProject)

router.delete('/project/remove/:id',jwtMiddleware,projectcontroller.deleteUserProject)


//edit user
router.put('/user/edit',jwtMiddleware,multerConfig.single('profile'),userController.editUser)

//4.export
module.exports = router;

// wen need to have connection with backend index.js we have a connection
