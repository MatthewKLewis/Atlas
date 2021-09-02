const mongoose = require('../connection');

const Schema = mongoose.Schema

const shopItemSchema = new Schema({
        "name": {
            type: String,
            required: true
        },
        "description": {
            type: String,
            required: true
        },
        "price": {
            type: Number,
            required: true
        },
    }
);
  
module.exports = mongoose.model("ShopItem", shopItemSchema);