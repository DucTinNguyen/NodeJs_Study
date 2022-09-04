const news = require("../../controllers/news.controller");
const express = require("express");
const comment = require("../../controllers/news.controller");
let router = express.Router();

const initNewsRoute = app =>{
      // Create a new Tutorial
      router.post("/", news.create);
      router.get("/news",news.getAllnews)
      router.get("/news/:id",news.getNewItem)
      router.delete("/news/:id",news.deleteItem)
      router.put("/:id",news.updateItem)
      // Comment
      router.post('/create-Comment',comment.createComment)
      router.get('/find-comment-new/:newId',comment.getCommentBynewId)
      router.get('/find-comment/:commentId',comment.getCommentById)
      router.get('/find-All-Comment',comment.getAllCommentById)
    return app.use('/api/',router)
}
module.exports = initNewsRoute;