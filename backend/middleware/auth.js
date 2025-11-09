
import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Auth Middleware Token:", token);

    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const token_decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user = { id: token_decoded.id };   
        next(); //callback function
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export default authMiddleware;