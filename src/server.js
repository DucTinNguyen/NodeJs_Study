const express = require('express')
const db = require('../models')
const newsRoute = require("./route/news.route")
 
const app = express()
const port = 3000
//set up express giúp cho gửi data từ client lên server và lấy data về
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//khoi chay sequelize
  db.sequelize.sync()
//chay router
newsRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})