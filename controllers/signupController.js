const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const {body, validationResult} = require('express-validator');

exports.getSignup = asyncHandler(async(req, res, next) =>{    
    if(req.isAuthenticated()){
        console.log("USER IS AUTHENTICATED REDIRECTING TO POSTS")
        res.redirect("/posts")
        //res.render("all-posts", {user: req.user.name})
    }
    else{
        res.render("signup");
    }
})

exports.postSignup = [
    body("name", "name should be longer than 3 characters")
        .trim()
        .isLength({min:3})
        .escape(),
    body("email")
        .trim()
        .escape()
        .custom(async(value) =>{
            const user_exists = await User.find({email: value}).exec();
            console.log('USER EXISTS SHOWS: ', user_exists)
            if (user_exists.length > 0){
                console.log('this was true')
                throw new Error('Email already in use')
            }
                
        }),
    body('password')
        .isLength({min:5}).withMessage('password must be at least 5 characters')
        .matches(/\d/).withMessage('password must contain a number')
        .trim()
        .escape(),
    body("confirm-password").custom((value, {req})=>{
        return value === req.body.password;
    }).withMessage('Passwords do not match'),
    body("code").custom((value) =>{
        return value == 3022;
    }).withMessage('Incorrect Membrship code')
    ,
    asyncHandler(async(req, res, next) =>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render("signup", {
                errors: errors.array()
            });
            return
        }

        else{            
            bcrypt.hash(req.body.password, 10, async(err, hashedPassword) =>{
                if(err){
                    next(err)
                }
                else{
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword,
                        status: 'member'
                    });
                    const result = await user.save();
                    res.redirect("/");
                }
            })
        }
    })
]