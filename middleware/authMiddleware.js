import jwt from "jsonwebtoken";
import { UnauthenticatedError, UnauthorizedError } from "../errors/customerror.js"; // Import custom error classes


export const isAuthenticated = async (req,res,next)=>{
  const token = req.cookies.token

  const decode = await jwt.decode(token,process.env.JWT_SECRET)

  req.user = decode
  
  if (!req.user) {
    throw new UnauthenticatedError("Logged in First")
  }
  
  
  next()
}

export const isManger = async (req,res,next)=>{
  console.log(req.user);
  if(req.user.role === "manager"){
    return next()
  }else{
    throw new UnauthorizedError("Only Manager Can Acess")
  }
}
