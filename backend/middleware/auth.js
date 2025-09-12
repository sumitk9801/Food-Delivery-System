import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];


  if(!token){
    return res.status(401).json({success:false,message: "Authentication failed: No token provided" });
  }

  try{
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
    req.user=token_decode;
    console.log("User in reqq:", req.user);
    next();
  } catch(error){
    return res.status(401).json({success:false,message:"Authentication failed: Invalid token"});
  }
};


export default auth;
