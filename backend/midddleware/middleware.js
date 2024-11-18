const { jwt, jwtkey } = require("../jwt/jwt")

// import { jwt, jwtkey } from "../jwt/jwt"  //search why not working


function middleware(req,res,next) {
    const token = req.headers.authorization

    if (!token) {
        return res.json({mssg: "SEND THE TOKENNN"})
    }
    try {
        const verified = jwt.verify(token,jwtkey) 

        req.username = verified.username
        next()
    } catch (error) {  //throws error if not verified
        res.json({mssg: "INVALID TOKEN",error: error.message})
    }
}

module.exports = middleware