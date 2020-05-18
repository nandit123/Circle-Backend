const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User =  require('../models/user');

router.post('/signup', (req, res, next) => {
    console.log("here");
    User.find({email:req.body.email})
        .exec()
        .then(user=>{
            if(user.length>=1){
                console.log("len>1");
                res.status(409).json({                              // 409 Conflict Resource
                message: "Mail Exists"
            });}
            else{
                console.log("else");
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if(err) {
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash 
                        });
                        user.save()
                        .then(result => {
                            console.log(result);
                            res.status(201).json({                  // 201 New Resource Created
                                message: "User Created"
                            });
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error: err
                            });
                        })
                    }
                });
            }                           
        });                                               // 422 Unprocessable Entity
});

router.post('/login', (req, res, next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message: "Auth Failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({
                    message: "Auth Failed"
                }); 
            }
            if(result){
                const token = jwt.sign({
                    email: user[0].email,
                    _id: user[0]._id
                },
                "secret key",
                {
                    expiresIn: "1h"
                });

                return res.status(200).json({                  // 201 New Resource Created
                    message: "Authenticated",
                    token:token
                });
            }
            res.status(401).json({
                message: "Auth Failed"
            }); 
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.delete('/delete/:userId', (req, res, next)=>{
    User.remove({_id:req.param.userId}).exec()
        .then(result=>{
            res.status(200).json({
                message: "User Deleted"
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});

module.exports = router;