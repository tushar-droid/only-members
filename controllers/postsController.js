const asynHandler = require("express-async-handler");

exports.getAllPosts = asynHandler(async(req, res, next) =>{
    res.render('all-posts');
});


