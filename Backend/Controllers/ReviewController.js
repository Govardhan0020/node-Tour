// const Reviews = require("../Modules/ReviewModel")

// //get Single data
// const getReviews = async (req, res) => {
//     try {
//         const id = req.params.id
//         const ReviewData = await Reviews.findById({ _id: id })
//         res.status(200).json(ReviewData)
//     } catch (err) {
//         res.status(400).json({ error: err.message })
//     }
// }
// const getallReviews = async (req, res) => {
//     try {
//         const ReviewData = await Reviews.find()
//         res.status(200).json(ReviewData)
//     } catch (err) {
//         res.status(400).json({ error: err.message })
//     }
// }
// //create data
// const createReviews = async (req, res) => {
//     try {

//         const MainReview = await Reviews.create({
//             Star: req.body.Star,
//             ReviewText: req.body.ReviewText
//         })
        
//         res.status(201).json(MainReview)
//     } catch (err) {
//         res.status(400).json({ error: "error test", msg: err.message })
//     }

// }
// // delete Data
// const deleteReviews = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const ReviewData = await Reviews.findByIdAndDelete({ _id: id });
//         res.status(200).json(ReviewData)
//     } catch (err) {
//         res.status(400).json({ error: err.message })
//     }
// }
// //update Data
// const editReviews = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const ReviewData = await Reviews.findByIdAndUpdate({ _id: id }, req.body, { new: true, })
//         res.status(200).json(ReviewData)
//     } catch (err) {
//         res.status(400).json({ error: err.message })
//     }
// }


// module.exports = {
//     getReviews,
//     getallReviews,
//     createReviews,
//     deleteReviews,
//     editReviews
// }

const Review = require("../Modules/ReviewModel");
const Tour = require("../Modules/TourModel")

//get id
const getReview = async(req,res)=>{
    try{
        const id=req.params.id
        const ReviewData=await Review.findById({_id:id})
        res.status(200).json(ReviewData)
    }catch(err){
        res.status(400).json({error:err.messege})
    }
}
//get while data
 const getAllReviewData = async(req,res)=>{
    console.log(req);
    try{
        const AllReviewData=await Review.find()
        res.status(200).json(AllReviewData)
    }catch(err){  
        res.status(400).json({error:err.messege})
    }
 }
 // create review
const  createReview =async(req,res)=>{
    console.log(req)
    try{
        const tour =await Tour.findById(req.params.id)
        if(!tour){
            return res.status(401).json({
                message:"no tour found"
            })
        }
        console.log(tour)
        const token = req.headers.authorization
        const tokenid = JSON.parse(Buffer.from(token.split(".")[1],"base64").toString())
        console.log(""+req.params.id+tokenid._id)
        console.log(tokenid);
        const responsiveReview= await Review.create({
            tourreview:""+req.params.id+tokenid.id,
            user:tokenid.id,
            tourid:req.params.id,
            name:tokenid.name,
            review:req.body.review,
            rating:req.body.rating
        })
        res.status(200).json(responsiveReview)

    }catch (err){
        res.status(400).json({
        
          error:err.message
        })
    }
}
 //delete
 const  deleteReviews = async(req,res)=>{
    try{
        const token = req.headers.authorization
        const tokenid = JSON.parse(Buffer.from(token.split(".")[1],"base64").toString())
        const Reviews = await Review.findById(req.params.id)
        if(tokenid.id == Reviews.user){
            const reviewdata = await Review.findByIdAndDelete(req.params.id);
            res.status(200).json({
                status:"succesfully deleted"
            })
        }else{
            res.status(400).json({
                message:"you are not Authorized"
            })

        }
      

    }catch(err){
        res.status(400).json({error:err.message})
    }
 }
 //update
 const  editReviews = async(req,res)=>{
    try{
        const id=req.params.id;
        const Reviewdata = await Review.findByIdAndUpdate({_id:id},req.body,{new:true});
        res.status(200).json(Reviewdata)

    }catch(err){
        res.status(400).json({error:err.message})
    }
 }

module.exports = {
    getReview,
    getAllReviewData,
    createReview,
    editReviews,
    deleteReviews

}