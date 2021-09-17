const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required:[true,"productID is required"]
        },
        quantity: {
            type: Number,
            default: 1
        },
    } ]
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});
// {"userID":"60db5db754cf3f5fd07895d7","products":[{"product":"60db368f9ac6134f5411b969","quantity":3}]}
const Cart = mongoose.model("Cart", CartSchema)

module.exports = {
    Cart
}