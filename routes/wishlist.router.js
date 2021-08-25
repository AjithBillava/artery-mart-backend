const express = require("express")
const {
    getWishlist,
    addItemToWishlist,
    removeItemFromWishList
} = require("../controllers/wishlist.controller")
const checkAuth = require("../middlewares/checkAuth")
const wishlistRouter = express.Router()

wishlistRouter.route("/:userId/wishlist").all(checkAuth).get(getWishlist).post(addItemToWishlist)
wishlistRouter.route("/:userId/wishlist/remove").all(checkAuth).post(removeItemFromWishList)


module.exports = wishlistRouter