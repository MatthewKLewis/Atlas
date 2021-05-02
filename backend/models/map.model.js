const mongoose = require('../connection');

const Schema = mongoose.Schema

const mapSchema = new Schema({
        "name": {
            type: String,
            required: true
        },
        "width": {
            type: Number,
            required: true
        },
        "height": {
            type: Number,
            required: true
        },
        "userId": {
            type: String
        }
    }
);
  
module.exports = mongoose.model("Map", mapSchema);