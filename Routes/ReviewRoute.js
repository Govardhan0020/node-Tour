// const express = require("express")

// const Reviews = require("../Modules/ReviewModel")

// const router = express.Router()

// //require the controllers
// const { getReviews, getallReviews, createReviews,deleteReviews,editReviews}=require("../Controllers/ReviewController")
// // const { getallReviews } = require("../Controllers/ReviewController")


// router.get("/:id",getReviews)

// router.get("/",getallReviews)

// router.post("/",createReviews)

// router.delete("/:id",deleteReviews)

// router. patch("/:id",editReviews)



// module.exports=router
const express = require("express")
const {verfiyToken}=require("../Controllers/userController")

const {getReview,getAllReviewData,createReview, deleteReviews, editReviews} = require("../Controllers/ReviewController")
const router = express.Router()
 

router.get("/",getAllReviewData )
router.get("/:id",getReview)
router.post("/:id",verfiyToken,createReview)
router.delete("/:id",verfiyToken,deleteReviews)
router.patch("/:id",editReviews)


module.exports = router;