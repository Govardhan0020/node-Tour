const express = require("express")

const Tourist = require("../Modules/TourModel")

const router = express.Router()

//require the controllers
const { getTourist,createTourist,editTourist,deleteTourist }=require("../Controllers/TourController")
const { getallTourist } = require("../Controllers/TourController")


router.get("/:id",getTourist)

router.get("/",getallTourist)

router.post("/",createTourist)

router. patch("/:id",editTourist)

router.delete("/:id",deleteTourist)

module.exports=router