import express from "express"
import {createproduct,getProduct, productPhoto,deleteProduct} from "../controller/productController.js"


const router=express.Router()


// route for creating product
router.post("/create-product",createproduct)

//route for display product details
router.get("/get-product",getProduct)


//product-photo
router.get("/product-photo/:pid",productPhoto)

//delete product 
router.delete("/delete-product/:id",deleteProduct)


export default router