import { json } from "express"
import { comparePassword, hashpassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"

//SIGN-UP
export const signIn =async (req,res)=>{
    try{

        const {
            name,email,mobile,password
        }=req.body
        if(!name){
            return res.send({error:"name is required"})
        }
        if(!email){
            return res.send({error:"email is required"})
        }
        if(!mobile){
            return res.send({error:"phone number is required"})
        }
        if(!password){
            return res.send({error:"password is required"})
        }

      //check user
      const exisitingUser= await userModel.findOne({email})

      if(exisitingUser){
        return res.status(200).send({
            success:true,
            message:"user already exisit"
        })
      }
      const hashedpassword=await hashpassword(password)
      const user= await new userModel({name,email,mobile,password:hashedpassword}).save()

      res.status(201).send({
            success:true,
            message:"user register successfully",
            user,
      })


    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error",
            error
        })

    }
    
}

//LOGIN 
export const logIn=async (req,res)=>{
    try{
       const {email,password}=req.body

       //validation
        if(!email||!password){
            return  res.status(404).send({
                success:false,
                message:"invalid password or email",
            })
            }
            //check user
            const user= await userModel.findOne({email})
            if(!user){
              return  res.status(404).send({
                    success:false,
                    message:" Email id does not exit"
                })
            }


            //compare password
        const  compare=await comparePassword(password,user.password)
        if(!compare){
           return res.status(404).send({
                success:false,
                message:"invalid password"
            })
        }
       
        //token
        const token= await JWT.sign({_id:user._id},process.env.JWT_SC,{
            expiresIn:"7d"
        })
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                name:user.name,
                email:user.email,
                mobile:user.mobile,
                password:user.password,
                role:user.role
            },
            token
        })
    


    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }

}

// setting test 
 export const test=(req,res)=>{
    try{
    res.send("protected route")
    }
    catch(error){
        console.log(error)
        res.send({error})
    }
    
 }

 //forgotten password

 export const forgottenPassword=async(req,res)=>{
    try{
        const{email,mobile,newPassword}=req.body
        if(!email){
            res.status(404).send({message:"email not found"})
        }
        if(!mobile){
            res.status(404).send({message:"write something "})
        }
        if(!newPassword){
            res.status(404).send({message:'new password required'})
        }

        const user=await userModel.findOne({email,mobile})
        if(!user){
            res.status(404).send({
                success:false,
                message:"enter valid email and phone number"
            })
        }
    const hashed=await hashpassword(newPassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed})
    res.status(200).send({
        success:true,
        message:"password updated successfully"
    })

    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })

    }

 }

 //getuser

 export const getUser=async(req,res)=>{
     try{
        const user=await userModel.find()
       res.json(user)
     }

       catch(error){
        res.status(500).send({
            success:false,
            message:"something error"
        })
    }



 }

 //delete user


