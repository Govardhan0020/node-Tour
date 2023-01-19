
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

// Static Signup Function
userSchema.statics.signup = async (email, password) => {
    const exists = await User.findOne({ email });
    if (exists) {
        throw Error("This Email Already Registered")
    }
    // const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({ email, password: hash });
    return user;

}

// Static Login Function
userSchema.statics.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw Error("Incorrect Email")
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error("Incorrect Password")
    }
    return user;
}
 
const User = new mongoose.model('User', userSchema)
module.exports = User;