<<<<<<< Updated upstream
import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];


  if(!token){
    return res.status(401).json({success:false,message: "Authentication failed: No token provided" });
  }

  try{
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
    req.user=token_decode;
    next();
  } catch(error){
    return res.status(401).json({success:false,message:"Authentication failed: Invalid token"});
  }
};


export default auth;
=======
import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next)=>{

    const token = req.headers.token;

    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        if (!req.body) {
            req.body = {};
        }
        req.body.userId=token_decode.id;
        next(); //callback function
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export default authMiddleware;
>>>>>>> Stashed changes
