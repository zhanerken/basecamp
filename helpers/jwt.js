const jwt = require('jsonwebtoken');

const generateToken = (user_id, email) => {
    const token = jwt.sign(
        { user_id, email },
        "Some secret key", {
        expiresIn: 60 
    })

    return token;
}

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, "Some secret key");
        return payload;
    } catch(err) {
        return {"message" : err.message};
    }
}

module.exports = {
    generateToken,
    verifyToken
}