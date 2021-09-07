const mongoose = require("../connection");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const inventoryItemSchema = new Schema({
  createdOn: Date,
  name: String,
  rarity: String,
  type: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("InventoryItem", inventoryItemSchema);
