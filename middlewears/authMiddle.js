import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';


//protected route token base
export const requiresignIn=async (req,res,next)=>{
    try{
   const  decode=JWT.verify(req.headers.authorization,process.env.JWT_SC)
   req.user=decode
   next()
    }
    catch(error){
        console.log(error)
    }
}

// admin access
 export  const isAdmin=async (req,res,next)=>{
    try{
         const user=await userModel.findById(req.user._id)
         if(user.role!==1){
            return res.status(401).send({
                success:false,
                message:"unAuthorized access"
            })
         }

         else{
            next();
         }
    }
    catch(error){
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"error in admin login"
        })

    }

 }
