const {User }= require("../model/user.model")
const {Cart }= require("../model/cart.model")

const getCartDetails = async (req, res, next) => {
    const {
        userId
    } = req.params

    try {
        const cartItem = await Cart.findOne({
            userId
        }).select("-__v").populate("products.product").select("-__v")

        res.status(200).json({
            item: cartItem
        })
    } catch (error) {
        next(error)
    }

}

const addItemToCart = async (req, res, next) => {
    const {
        userId,
        product,
        quantity
    } = req.body
    const foundUserCart = await Cart.findOne({
        userId
    })
    const foundUser = await User.findById(userId);
    // console.log(foundUserCart,foundUser)
    try {

        if (foundUserCart) {  
                foundUserCart.products.push({
                    product,quantity
                })
                const newCart = await (await foundUserCart.save()).populate("products.product").execPopulate();
            // console.log(newCart,foundUserCart)
            return res.status(201).json({
                message: "item added to cart",
                item: newCart
            })
            
            
        }

        const addToCart = new Cart({
            userId,
            products: [{
                product,quantity
            }]
        })
        // console.log(addToCart,product,quantity)
        foundUser.cart = addToCart
        await foundUser.save();
        const newCart = await(await addToCart.save()).populate("products.product").execPopulate();

        res.status(201).json({message:"item added to cart",item:newCart})


    } catch (error) {
        next(error)
    }
}

const removeFromCart = async (req,res,next) =>{
    const {userId,productId} = req.body;
    try{
        const  userCart = await Cart.findOne({userId}).select("-__v")
        // console.log(userCart.products)
        userCart.products = userCart.products.filter(item=>String(item._id)!==String(productId))

        const newCart = await ( await userCart.save()).populate("products.product").execPopulate();
        console.log(newCart)
        res.json({success:true,message:"product removed successfully",item:newCart})
    }
    catch(error){
        next(error)
    }
}


module.exports = { getCartDetails,addItemToCart,removeFromCart }