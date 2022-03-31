const User = require("../models/user.js");
const mongoose = require("mongoose");
const bcryptjs= require("bcryptjs");
const jwt = require("jsonwebtoken");

const user_signup = (req,res,next)=>{
    // users.push(req.body);
    // res.json({message:"This is coming from api/routes/user.js but through post"});
    //try finding if user exists
    User.find({
        email:req.body.email.toLowerCase()
    }).exec()
    .then(user=>{
        console.log("This is the user");
        console.log(user);
        //if user is found that means user already exists, return a conflict 
        if(user.length>=1){
            return res.status(409).json({
                message:"email already exist"
            })
        }else{
            //create a hash by salting and hashing the password
            bcryptjs.hash(req.body.password, 10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    //User not found in the database, and we will create a new user
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email.toLowerCase(),
                        password: hash,
                        accessLevel: req.body.accessLevel,
                    });
                    user.save()
                    .then((result)=>{
                        //capturing the success result
                        console.log("This is the result from saving");
                        console.log(result);
                        //constructing successful response
                        res.status(201).json({
                            message:"User created",
                            user:result
                        });
                    })
                }
            })

            

        }
    })
    .catch(err=>{
        //Error in any part of execution will be handled in this and create response
        console.log(err);
        res.status(500).json({
            error:err
        })
    })    
};
const get_all_users = (req,res,next)=>{
    User.find()
    .exec()
    .then((users)=>{
        const result={
            count:users.length,
            users:users.map(user=>{
                return {
                    user,
                    link:`http://localhost:5000/users/${user._id}`
                }
            })
        };
        res.status(200).json({result})
    })
    .catch(
        (err)=>{
            res.status(500).json({
                message:"there is some error",
                err
            });
        }
    )
};    
const get_single_user=(req,res,next)=>{
    const {userId} = req.params;
    User.find({_id:userId})
    .exec()
    .then(user=>{
        if(user.length>=1){
            res.status(200).json({
                message:"Getting single user",
                user
            })
        }
    })
    .catch(error=>
        res.status(500).json({
            message:"there is some error",
            error

        })
    )
    
};
const update_a_user=(req,res,next)=>{
    const {userId}=req.params;
    const updates = {};
    for(const [key,value] of Object.entries(req.body)){
        updates[key]=value
    }
    User.update({_id:userId},{$set:updates})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"User successfully updated",
            result
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is some error",
            error
        })
    })
}
const delete_a_user=(req,res,next)=>{
    const {userId} = req.params;
    User.remove({
        _id:userId
    })
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"User successfully deleted",
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is some error",
            error
        })
    })
}
const user_login = (req,res,next)=>{
    User.find({
        email:req.body.email.toLowerCase()
    }).exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:"auth failed"
            })
        }
        bcryptjs.compare(req.body.password, user[0].password,(err,result)=>{
            // if(err){
            //     return res.status(500).json({
            //         message:"auth failed",
            //         error:err
            //     })
            // }
            if(result){
                //generate jwt here
                const token = jwt.sign({
                    email:user[0].email,
                    accessLevel:user[0].accessLevel
                },
                "Vedansh",//secret key
                {
                    expiresIn:"1h"
                }
                )
               return res.status(200).json({
                   message:"auth successful",
                   token
               }) 
            }
            else{
                return res.status(401).json({
                    message:"auth failed"
                })
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:"auth failed",
            error:err
        })
    })
}
module.exports = {user_signup,get_all_users,get_single_user,update_a_user,delete_a_user,user_login};