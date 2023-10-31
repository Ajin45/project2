import slugify from "slugify"
import productadd from "../models/productadd.js"
import fs from "fs"


//creating product
export const createproduct=async(req,res)=>{
    try{
        const {name,slug,price,discripition,quantity,catergory,shipping}=  req.fields;
        const {photo}=req.files;

        //validation
       switch(true){
        case !name:
            return res.status(500).send({
                error:"name is required"
            })

            case !price:
                return res.status(500).send({
                    error:"price is required"
                })

                case !discripition:
                    return res.status(500).send({
                        error:"discripition is required"
                    })

                    case !quantity:
                        return res.status(404).send({
                            error:"quantity is required"
                        })
                        case !catergory:
                            return res.status(500).send({
                                error:"catergory is required"
                            })


                            case photo && photo.size > 1000000:
                               return res.status(500).send({
                                   error:"photo is required"
                               })
    

    
       }
        const products= new productadd({ ...req.fields, slug:slugify(name)})
          if(photo){
            products.photo.data=fs.readFileSync(photo.path)
            products.photo.contentType =photo.type
          }
          await products.save();
          res.status(200).send({
            success:true,
            message:"product successfully created",
            products
          })
    }
    catch(error){
   console.log(error)
     res.status(404).send({
        success:false,
        message:"something went wrong"
     })
    

    }

}


//get all product
export const getProduct=async (req,res)=>{
    try{
        const result=await productadd.find({}).select("-photo").sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"details of all product giving in the following",
            count:result.length,
            result
        })

    }
    catch(error){
        res.status(500).send({
            success:false,
            message:"something wrong"
        })
    }

}

//get product photo
export const productPhoto=async(req,res)=>{
    try{
        const product= await productadd.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set("content-type",product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }

    }catch(error){
        res.status(200).send({
            success:false,
            message:"inavlid entry"
        })
    }

}

//delete product
export const deleteProduct=async (req,res)=>{
    try{
    await productadd.findByIdAndDelete(req.params.id).select("-photo")
    res.status(200).send({
        success:true,
        message:"product deleted successfully"
    })
        
    }catch(error){
        res.status(500).send({
            success:false,
            message:"error occur while deleting"
        })
    }

}

