const jwt = require("jsonwebtoken")

const checkAuth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1] || null;
    console.log(token)
    if(token===null){
        return res.status(401).json({message: "login for better experience"})
    }

    try{
        const jwtSecretKey = process.env.JSWSECRET
        const decoded = jwt.verify(token,jwtSecretKey)

        req.user= decoded
        next()
    }
    catch(err){
        res.status(401).json({errMessage:"Your session is expired. please sign-in again"})
    }
}


module.exports = checkAuth