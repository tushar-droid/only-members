const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user");


exports.getSignup = asyncHandler(async(req, res, next) =>{    
    res.render("signup");
})

exports.postSignup = asyncHandler(async(req, res, next) =>{
    //REMOVE ONCE DONE
    console.log("YOUR REQUEST HAS BEEN RECIEVED WITH THESE DETAILS");
    console.log("NAME: ", req.body.name);
    console.log("EMAIL: ", req.body.email);
    console.log("PASSWORD: ", req.body.password);

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
})