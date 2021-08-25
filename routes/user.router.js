const express = require("express")
const userRouter = express.Router();

const {
    loginUser,
    registerUser,
    getUserDetails
} = require("../controllers/user.controller")
const checkAuth = require("../middlewares/checkAuth")

userRouter.route("/login").post(loginUser)
userRouter.route("/register").post(registerUser)
userRouter.route("/").all(checkAuth).get(getUserDetails)

module.exports = userRouter