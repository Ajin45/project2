import express from "express"
import dotenv from "dotenv"
import db from "./config/connection.js"
import morgan from "morgan"
import authRoute from "./routes/authRoute.js"
import cors from "cors"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import formidable from "express-formidable"






const app=express()

//config env
dotenv.config()

//config database
db()

//middlewear
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use(formidable())

//creating api

app.use("/api/auth",authRoute)

app.use("/api/cat",categoryRoutes)

app.use("/api/product",productRoutes)



app.get("/",(req,res)=>{
    res.send("Api")
})


const PORT=process.env.PORT||7000;

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})


