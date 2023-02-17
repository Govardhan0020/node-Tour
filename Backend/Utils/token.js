const jwt = require('jsonwebtoken');

const createToken = (id,name) => {
    return jwt.sign({ id, name }, "mysecret", {
        expiresIn: "3d"
    })
}
module.exports = createToken;