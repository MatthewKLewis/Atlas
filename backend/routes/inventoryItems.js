const express = require("express")
const router = express.Router()
const cors = require('cors')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const InventoryItem = require('../models/inventoryItem.model')
const User = require('../models/user.model')
const RandomItemGenerator = require('../generators/randomItemGenerator');

let randomIG = new RandomItemGenerator()
console.log(randomIG.getRandomItem())


//CREATE
router.post('/addNew', (req, res, next)=>{

    let tempItem = randomIG.getRandomItem()

    let newShopItem = new InventoryItem({
        createdOn: Date.now(),
        name: tempItem.name,
        type: tempItem.type,
        rarity: tempItem.rarity,
        owner: req.body._id
    });
    newShopItem.save()
    User.findById(req.body._id).then((user)=>{
        user.inventory.push(newShopItem._id);
        user.save()
        res.json({success: true, item: newShopItem})
    })
})

//READ
router.get('/all/:id', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    console.log(req.params.id)
    InventoryItem.find({owner: req.params.id}).then((items)=>{
        res.json({success: true, list: items})
    })
})

//UPDATE


//DESTROY


module.exports = router;