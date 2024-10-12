require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization ;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(403).json({
            success: false,
            message: "cant get token"
        });
    }
    const token  = authHeader.split(" ")[1];

    try{
        const decode = jwt.verify(token,JWT_SECRET);
        if(decode.userId){
            req.userId= decode.userId;
            next();
        }else{
            return res.status(403).json({
                success: false,
                message: "cant get payload"
            })
        }

    }catch(err){
        return res.status(403).json({
            success: false,
            message: "something went wrong in Middleware",
            error: err.message
        })
    }
}

module.exports = {authMiddleware}