const asyncHandler = require("express-async-handler");
const Post = require("../models/post")
const User = require("../models/user")
const {body, validationResult} = require('express-validator');


exports.getAllPosts = asyncHandler(async(req, res, next) =>{
    
    const all_posts = await Post.find({}).populate('user').sort({'date':-1}).exec();
    res.render('all-posts', {isAuthenticated: req.isAuthenticated(), posts: all_posts,  user: req.user?req.user.name: ''});
});


exports.createNewPostGet = asyncHandler(async(req, res, next) =>{
    if(req.isAuthenticated())
        res.render("create-post-form", {isAuthenticated: true, user: req.user?req.user.name: ''} );
    else{
        res.render("signup", {alerts: "Please signup or login to create posts"})
        // res.redirect("/",)
        // res.redirect("/signup", {alerts: "Please signup or login to create posts"})
    }
})

exports.createNewPostPost = [
    body("title", "The title should be atleast 3 letters")
        .isLength({min:3})
        .trim()
        .escape(),
    body("details", "details should be at least 10 words")
        .isLength({min:10})
        .trim()
        .escape(),
    
    asyncHandler(async(req, res, next) =>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('create-post-form', {isAuthenticated:true, user: req.user? req.user.name: '', errors: errors.array()})
            return 
        }
        else{
            const post = new Post({
                title: req.body.title,
                details: req.body.details,
                date: new Date().toLocaleDateString(),
                user: req.user._id
            });
            const result = await post.save();
            res.redirect("/posts")
        }

})]