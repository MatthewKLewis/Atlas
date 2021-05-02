const express = require("express")
const router = express.Router()
const cors = require('cors')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const Map = require('../models/map.model')

//CREATE
router.post('/create', (req, res, next)=>{
    let newMap = new Map({
        width: req.body.width,
        height: req.body.height,
        userId: req.body.userId,
    });
    newMap.save()
})

//READ
router.get('/:id', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
    Map.findById(req.params.id)
})

//UPDATE


//DESTROY


module.exports = router;