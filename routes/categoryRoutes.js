import express from "express"
import { isAdmin} from "../middlewears/authMiddle.js"
import { createCatergory, updateCategory,getCatergory ,deleteCatergory} from "../controller/Create-catergory.js"






const router=express.Router()

//routes

//create catergroy
router.post("/create-cat",createCatergory,isAdmin)

//update catergory
router.put("/update-cat/:id",updateCategory,isAdmin)


//get  catergory
router.post("/get-cat",getCatergory)

//delete catergory
router.post("/delete-cat/:id",deleteCatergory)

export default router