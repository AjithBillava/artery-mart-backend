const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WishlistSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});
const WishList = mongoose.model("WishList", WishlistSchema);

module.exports = {
    WishList
}