const asyncHandler = require("express-async-handler");
const Post = require("../models/post")
const User = require("../models/user")



exports.getAllPosts = asyncHandler(async(req, res, next) =>{
    
    const all_posts = await Post.find({}).populate('user').exec();
    res.render('all-posts', {isAuthenticated: req.isAuthenticated(), posts: all_posts});
});


exports.createNewPostGet = asyncHandler(async(req, res, next) =>{
    if(req.isAuthenticated())
        res.render("create-post-form");
    else{
        res.render("signup", {alerts: "Please signup or login to create posts"})
        // res.redirect("/",)
        // res.redirect("/signup", {alerts: "Please signup or login to create posts"})
    }
})

exports.createNewPostPost = asyncHandler(async(req, res, next) =>{
    console.log(req.body.title);
    console.log(req.body.details);
    console.log(req.user._id)
    console.log("DATE: ", new Date().toLocaleDateString());
    const post = new Post({
        title: req.body.title,
        details: req.body.details,
        date: new Date().toLocaleDateString(),
        user: req.user._id
    });
    const result = await post.save();
    res.redirect("/posts")
})