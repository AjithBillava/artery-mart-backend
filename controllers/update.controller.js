const {Cart} = require("../model/cart.model")

const updateQuantityInCart = async (req, res, next) => {
	const { cartId, productsId ,operation } = req.body;
    // const queryParams = req.param.type
	
	try {
        const updateQuantity = await Cart.findById(cartId).select("-__v");
        if (operation === "increment") {
			updateQuantity.products.map((item) =>
				String(item._id) === String(productsId) ? (item.quantity = item.quantity + 1) : item
			);
			const updatedQuantity = await (await updateQuantity.save())
				.populate("products.product")
				.execPopulate();
			return res
				.status(201)
				.json({ message: "Quantity updated Successfully", item: updatedQuantity });
		}
		updateQuantity.products.map((item) =>
			String(item._id) === String(productsId) ? (item.quantity = item.quantity - 1) : item
		);
		const updatedQuantity = await (await updateQuantity.save())
			.populate("products.product")
			.execPopulate();
		return res
			.status(201)
			.json({ message: "Quantity updated Successfully", item: updatedQuantity });
	} catch (error) {
		next(error);
	}
};

module.exports ={updateQuantityInCart}