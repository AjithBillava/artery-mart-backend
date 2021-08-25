const express = require("express")
const {
  getAllProducts,
  postProduct
} = require("../controllers/product.controller")
const productRouter = express.Router()


productRouter.route("/").get(getAllProducts).post(postProduct)


module.exports = productRouter