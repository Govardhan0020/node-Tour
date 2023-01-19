const express=require("express")
require('dotenv').config()
require('./Db/connection')
const cors = require('cors')
const Cloudinary = require('./Utils/Cloudinary')
const FileUpload = require('express-fileupload')

const userRoutes = require('./Routes/userRoutes')
const TouristRoute = require('./Routes/TourRoute')
const ReviewRoute = require('./Routes/ReviewRoute')

const app=express()

const port = process.env.PORT || 7000

// User Router
app.use(cors())
app.use(express.json())
app.use("/api/user",userRoutes)

// Tourist Router
app.use(FileUpload({useTempFiles:true}))
app.use('/api/Tour',TouristRoute)

// Reviews Router
app.use("/api/Reviews",ReviewRoute)

Cloudinary()

app.listen(port,()=>{
    console.log(`server is running ... on ${port}`)
})