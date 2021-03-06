const express = require( "express" );
const cors = require( "cors" );
const mongoose = require("mongoose");

var server = express( );
var port = process.env.PORT || 3000 ;

//Data
var blogsModel = require("./schema.js");

// Middleware
server.use( express.urlencoded( {
    extended: false
} ) );
server.use( cors( ) );
server.use (express.json());



server.get("/blogs", function (req, res) {
  blogsModel.find().then(function (blogs) {
    var response = {
      blogs: blogs
    };
    res.json(response);
  }).catch(function (error) {
    var response = {
      msg:error.message
    };
    res.status(400);
    res.json(response);
  });
  /*var response = {
    blogs: blogsModel.blogs
  };
    res.json(response);
*/
});

server.post("/blogs", function (req, res) {
  blogsModel.create({
    title: req.body.blog.title,
    author:req.body.blog.author,
    category: req.body.blog.category,
    image: req.body.blog.image,
    text: req.body.blog.text
  }).then(function ( new_blog ) {
      res.status(201);
      res.json(new_blog);
  }).catch(function (error) {
    //if anything went wrong above, error is caught here
    var response = {
      msg:error.message
    };
    res.status(400);
    res.json(response);
  });
  /*model.blogs.push(req.body.blog);
  res.status(201);
  res.send();*/
});

server.delete("/blogs/:id", function (req, res) {
  blogsModel.findByIdAndDelete(req.params.id).then(function () {
    res.status(204);
    res.send();
  }).catch(function (error) {
    var response = {
      msg:error.message
    };
    res.status(400);
    res.json(response);
  });
});

server.get("/blogs/:id", function (req, res) {
  blogsModel.findById(req.params.id).then(function (blog) {
    res.status(201);
    var response = {
      blog: blog
    };
    res.json(response);
  }).catch(function (error) {
    var response = {
      msg:error.message
    };
    res.status(400);
    res.json(response);
  });
});

mongoose.connect("mongodb+srv://Hoki-Lokison:LokisonHoki@mydatabase-exh3w.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
}).then(function () {
  server.listen (port, function () {
    console.log(`listening on port ${port}`);
  });
});
