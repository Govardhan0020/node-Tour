const express=require('express')
const router=express.Router();
const {loginUser,signupUser}=require('../Controllers/userController')
// login user

router.post('/login', loginUser)

// sign user

router.post('/signup', signupUser)





module.exports = router;