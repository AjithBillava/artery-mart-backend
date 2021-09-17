const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
   
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    fastDelivery: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

const Product = mongoose.model("Product", ProductSchema)


module.exports = {
    Product
}