import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import { json } from 'express';


//api for create catergory
export const createCatergory= async (req,res)=>{
    try{
        const{name}=req.body
         if(!name){
           return res.status(404).send({
                 success:false,
                message:"name is required"
            })
         }

         //catergory check
         const exitingcategory=await categoryModel.findOne({name})
         if(exitingcategory){
           return res.status(200).send({
                success:true,
                message:"category already exit"
            })
         }

         //save category

         const category=await new categoryModel({name,slug:slugify(name)}).save()
           res.status(201).send({
            success:true,
            message:"catergory successfully created"
         })

    }

    //throwing error

    catch(error){
       res.status(500).send({
           success:false,
           message:"inavlid entry"

       })

    }

}

  //update category

     export const updateCategory=async(req,res)=>{
          try{
            const{name}=req.body
            const{id}=req.params
            const updatedCat=await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
             res.status(200).send({
                success:true,
                message:"successfully updated",
                updatedCat
             })


          }catch(error){
            res.status(500).send({
                success:false,
                message:"error in updation"
            
            })

          }
            

         } 
     //get all catergory

     export const getCatergory=async(req,res)=>{
       try{
       const result=await categoryModel.find()
       res.status(200).send({
         success:true,
        message:"catergory found",
        result
       })
       }
       catch(error){
        res.status(500).send({
          success:false,
          message:"cannot find catergory"
        })
      }
  
    
     }

     //delete catergory
     export const deleteCatergory=async(req,res)=>{
      try{
        await categoryModel.findByIdAndDelete(req.params.id)
          res.status(200).send({
            success:true,
            message:"deletion successful"
      })
      }

      catch(error){
        res.status(500).send({
          success:false,
          message:"deleting process failed"
        })
      }


     }

