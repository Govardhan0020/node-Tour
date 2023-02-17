const Tourist = require("../Modules/TourModel")
const geocoder = require("../Utils/Mapping")
const Cloudinary = require("cloudinary").v2
const Review = require('../Modules/ReviewModel')

//get Single data

// const getTourist=async(req,res)=>{
//     try{
//         const id=req.params.id
//         const TouristData=await Tourist.findById({_id:id})
//         res.status(200).json(TouristData)
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }

//     }
//     const getallTourist=async(req,res)=>{
//         try{
//             const TouristData=await Tourist.find()
//             res.status(200).json(TouristData)
//         } catch(err){
//             res.status(400).json({error:err.message})
//         }

//         }
// //create data
// const createTourist=async(req,res)=>{
//     try{
//         const imageUrl=await Cloudinary.uploader.upload(req.files.image.tempFilePath,{
//             use_filename:true,
//             folder:"uploadimage"
//         })
//         const tour = await Tourist.create({
//             title:req.body.title,
//             addresses:req.body.addresses,
//             description:req.body.description,
//             locationfee:req.body.locationfee,
//             image:imageUrl.secure_url,

//         })
//         res.status(201).json(tour)  
//     }catch(err){
//         res.status(400).json({error:"error test", msg:err.message})
//     }

// }

// //update Data
// const editTourist=async(req,res)=>{

//     try{
//         const id=req.params.id;
//         const imageUrl = await Cloudinary.uploader.upload(req.files.image.tempFilePath,{
//             use_filename:true,
//             folder:"uploadimage"
//         })
//         const loc = await geocoder.geocode(req.body.addresses);
//         const location = {
//             type:"Point",
//             coordinate:[loc[0].longitude,loc[0].latitude],
//             Address:loc[0].formattedAddress
//         }

//         const TouristData=await Tourist.findByIdAndUpdate({_id:id},
//             {
//                 title:req.body.title,
//                 image:imageUrl.secure_url,
//                 addresses:req.body.addresses,
//                 location:{
//                     coordinate:location.coordinate,
//                     Address:location.Address
//                 },
//                 description:req.body.description,
//                 locationfee:req.body.locationfee
//             },
//             {new:true,})
//         res.status(200).json(TouristData)
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }
// }


// //Delete Data

// const deleteTourist=async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const TouristData=await Tourist.findByIdAndDelete({_id:id});
//         res.status(200).json(TouristData)
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }
// }

// module.exports={
//     getTourist,
//     createTourist,
//     editTourist,
//     deleteTourist,
//     getallTourist
// }


//get Single data
const getTourist = async (req, res) => {
    try {
        const id = req.params.id
        const locationiddata = await Review.aggregate([{
            "$match": { "tourid": `${id}` }
        }])
        const TouristData = await Tourist.findById({ _id: id })
        res.status(200).json({ locationiddata, TouristData })
    } catch (err) {
        res.status(400).json({ error: err.messege })
    }

}
const getallTourist = async (req, res) => {
    try {
        const TouristData = await Tourist.find()
        res.status(200).json(TouristData)
    } catch (err) {
        res.status(400).json({ error: err.messege })
    }

}
//create data
const createTourist = async (req, res) => {
    try {
        let imageData = []
        const images = req.files.image
        const token = req.headers.authorization

        const tokenid = JSON.parse(Buffer.from(token.split(".")[1],"base64").toString())

        for (let index = 0; index < images.length; index++) {


            const imageUrl = await Cloudinary.uploader.upload(images[index].tempFilePath, {
                use_filename: true,
                folder: "uploadimage",

            })
            imageData.push(imageUrl.secure_url)
        }
        // console.log(imageData)


        const tour = await Tourist.create({
            title: req.body.title,
            user:tokenid.id,
            addresses: req.body.addresses,
            description: req.body.description,
            locationfee: req.body.locationfee,
            // image:imageUrl.secure_url,
            imagesd: { image: imageData }

        })
        res.status(201).json(tour)
    } catch (err) {
        res.status(400).json({ error: "error test", msg: err.message })
    }

}

//update Data
// const editTourist=async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const TouristData=await Workout.findByIdAndUpdate({_id:id},req.body,{new:true,})
//         res.status(200).json(TouristData)
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }
// }
//upadate

const editTourist = async (req, res) => {

    try {
        const id = req.params.id;
        const imageUrl = await Cloudinary.uploader.upload(req.files.image.tempFilePath, {
            use_filename: true,
            folder: "uploadimage"
        })
        const loc = await geocoder.geocode(req.body.addresses);
        const location = {
            type: "Point",
            coordinate: [loc[0].longitude, loc[0].latitude],
            Address: loc[0].formattedAddress
        }

        const TouristData = await Tourist.findByIdAndUpdate({ _id: id },
            {
                title: req.body.title,
                image: imageUrl.secure_url,
                addresses: req.body.addresses,
                location: {
                    coordinate: location.coordinate,
                    Address: location.Address
                },
                description: req.body.description,
                locationfee: req.body.locationfee
            },
            { new: true, })
        res.status(200).json(TouristData)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


//Delete Data

// const deleteTourist=async(req,res)=>{
//     try{
//         const token = req.headers.authorization
//         const tokenid = JSON.parse(Buffer.from(token.split(".")[1],"base64").toString())
//         const id=req.params.id;
//         const TouristData=await Tourist.findById({_id:id});
//         if(tokenid.id == TouristData.user){
//             const deleteTourist = await Review.findByIdAndDelete(_id.id);
//             res.status(200).json({
//                 status:"succesfully deleted"
//             })
//         }else{
//             res.status(400).json({
//                 message:"you are not Authorized"
//             })

//         }


//         res.status(200).json(TouristData)
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }
// }
const deleteTourist = async (req, res) => {
    try {
        const id = req.params.id;
        const TouristData = await Tourist.findByIdAndDelete({ _id: id });
        res.status(200).json(TouristData)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
module.exports = {
    getTourist,
    createTourist,
    editTourist,
    deleteTourist,
    getallTourist,

}