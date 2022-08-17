// const express = require('express')
import express from "express"
import configViewEngine from "./configs/viewEngine"
require('dotenv').config()
import initWebRouter from './route/web'
//set up port
const app = express()
const port = process.env.PORT || 3000;
console.log('port',port);
//set up  viewEngine  
configViewEngine(app);
//chạy router
initWebRouter(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})