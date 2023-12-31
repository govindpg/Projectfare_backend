// 1.import dotenv
//Loads .env file contents into process.env by default. 
require('dotenv').config()

//2. import express
const express = require("express");

//3.import cors
const  cors =require('cors')


//import router
const router =require('./Routing/router')

//import connection.jjs
require('./DB/connection')

// create express server

const pfServer = express()

//5.use of cors by server

pfServer.use(cors())
//order is imp
//6. parsing json      json form=at where key and valie and string but js object where key may not be string

pfServer.use(express.json())

//server using server
pfServer.use(router)


//pfserver for uploading file we need to acess it 
//first argument -how other application use folder we use this name for future reference
//second argument - to export that particular folder -express.static
pfServer.use('/uploads',express.static('./uploads'))



//7.customise port - by defult server is runnin at 3000 
const PORT = 4000 || process.env

//8.run server
pfServer.listen(PORT,()=>{
       console.log('server running sucesscully at '+PORT);
})

//get request
pfServer.get('/', (req, res) => {
       res.send(`<h1 style='color:blue'>hei my dear friend</h1> `)
})

//get request
pfServer.post('/', (req, res) => {
       res.send(`post requwets `)
})

//put request
pfServer.put('/', (req, res) => {
       res.send(`updates requests `)
})