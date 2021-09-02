const mongoose = require('../connection');
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
        "username": {
            type: String,
            required: true
        },
        "email": {
            type: String,
            required: true
        },
        "password": {
            type: String,
            required: true
        },
        "lastLogin" : {
            type: Date,
        },
        "inventory" : {
            type: Object 
        },
        "money" : {
            type: Number,
        }
    }
);
  
module.exports = mongoose.model("User", userSchema);

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })
    })
}

module.exports.comparePassword = function(candidate, hash, callback) {
    bcrypt.compare(candidate, hash, (err, isMatch)=>{
        if (err) throw err
        callback(null, isMatch)
    })
}