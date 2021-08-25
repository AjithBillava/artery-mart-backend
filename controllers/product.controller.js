const {Product} = require("../model/product.model")

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).select("-__v")
        res.status(200).json({
            message: "products updated successfully ",
            products
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            errorMessage: "An error occurred in fetching data"
        })
    }
}

const postProduct = async (req, res) => {

    const recievedData = req.body

    try {
        const newProduct = await Product({
            ...recievedData
        })
        const updatedProducts =await  newProduct.save();
        res.status(200).json({
            message: "Products updated",
            product: updatedProducts
        })
    } catch (err) {
        console.error(err);
        res.json(400).json({
            errorMessage: "Validation failed"
        })
    }

}

module.exports = {getAllProducts,postProduct}