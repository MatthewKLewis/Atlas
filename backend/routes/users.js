const express = require("express")
const router = express.Router()
const cors = require('cors')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

//Register
router.post('/register', (req, res, next)=>{
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        inventory: [],
        money: 0,
        lastLogin: Date.now()
    });
    User.addUser(newUser, (err, user)=>{
        if (err){
            res.json({success: false, msg: 'failed to register user'})
        } else {
            res.json({success: true, msg: 'registered user'})
        }
    })
})

router.post('/authenticate', (req, res, next)=>{
    const username = req.body.username
    const password = req.body.password
    User.findOne({username: username}).then((user)=>{
        if (user) {
            User.comparePassword(password, user.password, (err, isMatch)=>{
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(user.toJSON(), process.env.SECRET, {expiresIn: 604800})
                    res.json({
                        success: true,
                        msg: 'log in success', 
                        token: token,
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                    })
                    user.lastLogin = Date.now()
                    user.save()
                } else {
                    return res.json({success: false, msg: "wrong password"})
                }
            })
        } else {
            return res.json({success: false, msg: "user not found"})
        }
    }, ()=>{
        return res.json({success: false, msg: "login error"})
    })
})

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    res.json({user: req.user})
})

router.post('/updateInventoryAndMoney', passport.authenticate('jwt', {session: false}), (req, res, next)=>{
    req.user.inventory = req.body.inventory;
    req.user.money = req.body.money;
    req.user.save()
    res.json({success: true, msg: "information saved."})
})

module.exports = router;