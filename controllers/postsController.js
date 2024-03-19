const asynHandler = require("express-async-handler");
const Post = require("../models/post")
const User = require("../models/user")

exports.getAllPosts = asynHandler(async(req, res, next) =>{
    
    const all_posts = await Post.find({}).populate('user').exec();

    console.log(all_posts)

    res.render('all-posts', {isAllowed: req.isAuthenticated(), posts: all_posts});
});


