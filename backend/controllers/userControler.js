import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator"

//login user
const loginUser = async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"user does not exit"});
        }

       const isMatch = await bcrypt.compare(password,user.password);

       if(!isMatch){
        return res.json({success:false,message:"Invalid credentials"});
       }

       const token = createToken(user._id);
       res.json({success:true,token});

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
//   return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
}
//register user
  const registerUser = async(req,res)=>{
    // Handle case-insensitive field names
    const name = req.body.name || req.body.Name;
    const password = req.body.password || req.body.Password;
    const email = req.body.email || req.body.Email;
    
    
    try{

        //checking user already exists

        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }


        //validating email format and strong password

        if(!email || !validator.isEmail(email)){
            
            return res.json({success:false,message:"Please enter valid email."})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please entre Strong Password size length greater than 8"});
        }


        //hashing user password 
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id);
        res.json({success:true,token})


    }catch(error){
        console.log(error);
        res.json({success:false, message:"This is Error"});
    }
};
export {loginUser,registerUser}
