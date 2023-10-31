import express from "express"
import { signIn,logIn,test,forgottenPassword,getUser } from "../controller/authController.js";
import { isAdmin, requiresignIn } from "../middlewears/authMiddle.js";

const router= express.Router();

// register post method
router.post("/register",signIn)


//login post method
router.post("/login",logIn)

//test routes
router.get("/test",requiresignIn, isAdmin, test)

//forgotten password

router.post("/forgotten",forgottenPassword)

//protected user route auth
router.get("/user-auth",requiresignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//admin route auth
router.get("/admin-auth",requiresignIn,isAdmin,(req,res)=>{
    res.send(200).send({ok:true})
})

//get all user
router.post('/get-user',getUser)




export default router
