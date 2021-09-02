const express = require("express")
const router = express.Router()
const cors = require('cors')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const ShopItem = require('../models/shopItem.model')

//CREATE
router.post('/create', (req, res, next)=>{
    let newShopItem = new ShopItem({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
    newShopItem.save()
    res.json({success: true, msg: 'item added.'})
})

//READ
router.get('/all', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    ShopItem.find().then((items)=>{
        res.json({success: true, list: items})
    })
})

router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    ShopItem.findById(req.params.id)
})

//UPDATE


//DESTROY


module.exports = router;