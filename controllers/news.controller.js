const dbConfig = require('../config/db.config');
const db = require('../models')
const New = db.news;
const Comment = db.comment;
const sequelize = db.sequelize;
//create new news
let create = async (req, res) => {
   
   // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  } 
  // Create a New
  const newData = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };
  //save New in database
  New.create(newData)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({ 
    message:
      err.message || "Some error occurred while creating the New."
  })})
}
//Find all in database(get all database)
let getAllnews = async (req, res) => {
    New.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving News."
          });
    })
}
//Find new in database (get one news item)
let getNewItem = async (req, res) => {

    let {id} = req.params;

    New.findByPk(id)
    .then(data =>{
          console.log(data)
         res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving News."
          }); 
    })  
}
//delete one news item 
let deleteItem = async (req, res) => {
    let {id} = req.params;
    New.destroy({
        where:{
            id: id,
        }
    })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "New was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete New with id=${id}. Maybe New was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete New with id=" + id
        });
      });
}
//update item
let updateItem = async (req, res) => {

    let {id} = req.params;

    await New.update(req.body,{
      where: {
        id:id
      }
    })
    .then(num=>{
      if(num == 1){
        res.send({
          message: 'Update successfully'
        })
      }
      else{
        res.send({
          message: `Cannot update New with id=${id}. Maybe New was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not update New with id=" + id
      });
    })
}
///////////////////////////////////////////Comment....//////////////////////////////
//Create comment
let createComment = async (req, res) => {

  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }
  //Create comment
  const commentData = {
    name:req.body.name,
    text:req.body.text,
    newId:req.body.newId
  }
  //save in database
  Comment.create(commentData)
  .then(data => {
    res.json({
      data:data,
      message: "Comment created successfully"
    })
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating comment."
    });
  })
 
}
//Get comment from newId
let getCommentBynewId = (req, res) => {

  let {newId} =req.params;

  New.findByPk(newId,{include:['comments']})
  .then(data => {
    res.json({
      data:data,
      message: "Successfully"
    })
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving New with id=" + newId
    })
  })


}
//Get comment from id
let getCommentById = (req, res) => {

  let {commentId} = req.params;

  Comment.findByPk(commentId,{include:['new']})
  .then(data => {
    res.json({
      data:data,
      message: "Successfully"
    })
  })
  .catch(err => {
    res.status(500).json({
      message: "Error retrieving Comment with id=" + commentId
    })
  })
}
//Get all comment from commentID
let getAllCommentById = (req, res) => {
  let {commentId} = req.params;

  Comment.findAll({
    include:['new']
  })
  .then(data => {
    res.json({
      data:data,
      message: "Successfully"
    })
  })
  .catch(err => {
    res.status(500).send({
      message:err.message ||"Error retrieving",
    }
    )
  })
}
module.exports = {
    create,
    getAllnews,
    getNewItem,
    deleteItem,
    updateItem,
    createComment,
    getCommentBynewId,
    getCommentById,
    getAllCommentById
}