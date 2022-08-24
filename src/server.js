// const express = require('express')
import express from "express"
import configViewEngine from "./configs/viewEngine"
require('dotenv').config()
import initWebRouter from './route/web'
import connection from './configs/connectDB'
//set up port
const app = express()
const port = process.env.PORT;
//set up express giúp cho gửi data từ client lên server và lấy data về
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//set up  viewEngine  
configViewEngine(app);
//chạy router
initWebRouter(app)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})