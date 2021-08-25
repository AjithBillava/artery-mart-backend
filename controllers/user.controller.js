const {
    User
} = require("../model/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");


const getUserDetails = async (req, res) => {
    // console.log(req.user.id)
    try {
        const user = await User.findById(req.user.id)
            .select("-password -createdAt -updatedAt -__v")
            .populate({
                path: "cart",
                model: "Cart",
                populate: {
                    path: "products.product",
                    model: "Product"
                },
            })
            .populate({
                path: "wishList",
                model: "WishList",
                populate: {
                    path: "products",
                    model: "Product"
                },
            });
        return res.status(200).json({
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred"
        });
    }
}

const registerUser = async (req, res) => {

    const {
        firstname,
        lastname,
        email,
        password
    } = req.body;
    const checkValidation = validator.validate(email)

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({
            success: false,
            errorMessage: "Please fill all fields"
        })
    }

    try {
        if (checkValidation) {
            //checks for existing user in DB            
            const userEmail = await User.findOne({
                email
            })

            if (userEmail) {
                return res.status(403).json({
                    success: false,
                    errorMessage: "User is already exists..."
                })
            }
            const user = new User({
                firstname,
                lastname,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, async (err, hash) => {
                    if (err) {
                        throw new Error(err)
                    }

                    user.password = hash

                    const savedUser = await user.save();

                    jwt.sign({
                        id: savedUser._id,
                    }, process.env.JSWSECRET, {
                        expiresIn: "24h"
                    }, (err, token) => {
                        if (err) {
                            throw new Error(err)
                        }
                        savedUser.password = undefined, savedUser.__v = undefined
                        res.status(201).json({
                            success: true,
                            message: "User registered sucessfully.",
                            token,
                            savedUser
                        });

                    })
                })
            })

        } else {
            return res.status(400).json({
                success: false,
                errorMessage: "Entered email is not valid"
            })
        }
    } catch (error) {
        console.error(error);
        res.json(500).json({
            message: "An error occurred"
        });
    }
}


const loginUser = async (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Please enter all fields"
        });
    }

    const checkValidation = validator.validate(email);
    if (!checkValidation) {
        return res.status(400).json({
            message: "Entered email is not in the valid format"
        });
    }
    try {
        const user = await User.findOne({
                email
            })
            .select("-__v -created_at -updatedAt")
            .populate({
                path: "cart",
                model: "Cart",
                populate: {
                    path: "products.product",
                    model: "Product"
                },
            }).select("-createdAt -updatedAt -__v")
            .populate({
                path: "wishList",
                model: "WishList",
                populate: {
                    path: "products",
                    model: "Product"
                },
            }).select("-createdAt -updatedAt -__v")
        if (!user) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        // Validate password
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({
                message: "Invalid Credentials!"
            });
        }
        const JwtSecretKey = process.env.JSWSECRET;
        jwt.sign({
            id: user._id
        }, JwtSecretKey, {
            expiresIn: "24h"
        }, (err, token) => {
            if (err) {
                throw new Error(err);
            }
            user.password = undefined;
            res.status(200).json({
                message: "You are logged in",
                token,
                user
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred",
            error
        });
    }
};

module.exports = {
    loginUser,
    registerUser,
    getUserDetails
}