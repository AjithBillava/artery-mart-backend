const express = require("express")
const cartRouter = express.Router()

const {
    getCartDetails,
    addItemToCart,
    removeFromCart,
} = require("../controllers/cart.controller")
const { updateQuantityInCart } = require("../controllers/update.controller")

const checkAuth = require("../middlewares/checkAuth")

cartRouter.route("/:userId/cart").all(checkAuth).get(getCartDetails).post(addItemToCart)
cartRouter.route("/:userId/cart/remove").all(checkAuth).post(removeFromCart)
cartRouter.route("/:userId/cart/update").all(checkAuth).post(updateQuantityInCart)
module.exports = cartRouter