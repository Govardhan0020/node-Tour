const User = require('../Modules/userModel')
const createToken = require('../Utils/token')

const loginUser = async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await User.login(email, password);
      // create Token
      const token = createToken(user._id,email)
      res.status(200).json({ email, password, token, user:user._id})
   } catch (error) {
      res.status(400).json({ error: error.message })
   }
}

// sign up user
const signupUser = async (req, res) => {
   const { _id, email, password } = req.body
   try {
      const user = await User.signup(email, password);

      // create Token
      const token = createToken(user._id, email)
      res.status(200).json({ email, password, token ,_id})

   } catch (error) {
      res.status(400).json({ error: error.message })
   }

}
const verfiyToken = (req, res, next) => {
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
   } else {
      return res.status(401).json({
         message: "please login or register first"
      })
   }
   next()
}


module.exports = {
   loginUser,
   signupUser,
   verfiyToken
}