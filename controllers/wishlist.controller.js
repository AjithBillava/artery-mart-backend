const {User }= require("../model/user.model")
const {WishList }= require("../model/wishlist.model")

const getWishlist = async (req, res) => {
    const {
        userId
    } = req.params;
    // console.log(userId)
    try {
        const wishlist = await WishList.findOne({
            userId
        }).select("-__v -created_at -updatedAt").populate("products")
        res.status(200).json({
            items: wishlist
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            errorMessage: "An error occured at fetching data"
        })
    }

}

const addItemToWishlist = async (req, res, next) => {
    const {
        userId,
        product
    } = req.body;
    const foundUserWishlist = await WishList.findOne({
        userId
    });
    // console.log(foundUserWishlist)
    const foundUserData = await User.findById(userId);
    // console.log(userId,foundUserData)
    try {
        if (foundUserWishlist) {
            foundUserWishlist.products.push(product);
            const newWishList = await (await foundUserWishlist.save()).populate("products").execPopulate();

            return res.status(201).json({
                message: "Item added to wishlist",
                item:newWishList
            })
        }

        const addWishlist = new WishList({
            userId,
            products: [product]
        }) 
        // console.log(foundUserData)
        foundUserData.wishList = addWishlist;
       
        await foundUserData.save();
        const savedItem = await (await addWishlist.save()).populate("products").execPopulate();

        res.status(201).json({
            message: "Item added to wishlist",
            wishlist: savedItem
        })
    } catch (error) {
        next(error);
    }
}

const removeItemFromWishList = async (req, res, next) => {
    const {
        userId,
        product
    } = req.body;

    try {
        const wishList = await WishList.findOne({
            userId
        });
        wishList.products = wishList.products.filter((productId) => String(productId) !== String(product));

        const newWishList = await (await wishList.save()).populate("products").execPopulate();

        res.status(201).json({
            message: "Item, removed from wishlist",
            item: newWishList
        })


    } catch (error) {
        next(error);
    }
}

module.exports = {
    getWishlist,
    addItemToWishlist,
    removeItemFromWishList
};