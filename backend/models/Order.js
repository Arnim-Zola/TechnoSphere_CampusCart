const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
orderNumber: String,

user: String,

stationeryItems: [
{
name: String,
quantity: Number
}
],

status: {
type: String,
default: "pending"
},

createdAt: {
type: Date,
default: Date.now
}
});

module.exports = mongoose.model("Order", orderSchema);
