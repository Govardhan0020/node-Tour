// const mongoose=require("mongoose");
// const ReviewSchema = mongoose.Schema({
//     Star: {
//         type: Number,
//         required: true,
//         min:1,
//         max:5

//     },
//     ReviewText: {
//         type: String,
//         required: true,
//     },
   
// })

// const ReviewModel=new mongoose.model("ReviewCollection",ReviewSchema)


// module.exports = ReviewModel;

const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    tourreview:{
        type:String,
        unique:true
    },
    tourid:{
        type:String,
    },
    user:{
        type:String,
    },
    name:{
        type:String,
    },
    review:{
        type:String,
        require:true,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        require:true,
    }
},{timestamps:true})

const ReviewModel = new mongoose.model( "Review" ,reviewSchema);

module.exports = ReviewModel