const UserModel = require("../models/User.model")
const Validation = require('../helpers/Validation');
const Password = require('../helpers/Password');
const Token = require('../helpers/jwt');

const signUpUser = async (req, res) => {
    try {
        const { error } = Validation.UserValidationSchema.validate(req.body);
        if(error !== undefined && error !== null && error.details.length > 0) { throw new Error(error.details[0].message) }
        
        const user = await UserModel.findOne({email : req.body.email});
        if(user) { throw new Error("this email already exists") }

        req.body.password = await Password.hashPassword(req.body.password);
        const newUser = await UserModel.create(req.body);
        const token = Token.generateToken(newUser._id, req.body.email);
        
        res.status(201).send({ "message" : "Successfully created a user",
                                "user_id" : newUser._id,
                                "token": token
        });
    } catch(err) {
        res.status(400).send({"message":"Smth went wrong", "error_message":err.message});
    }
}

const signInUser = async (req, res) => {
    try {
        const { error } = Validation.AuthUserValidationSchema.validate(req.body);
        if(error !== undefined && error !== null && error.details.length > 0) { throw new Error(error.details[0].message) }
        
        const user = await UserModel.findOne({email : req.body.email});
        if(!user) { throw new Error("email or password is incorrect")};

        const status = await Password.isValidPassword(req.body.password, user.password);
        if(!status) { throw new Error("email or password is incorrect")};
        const token = Token.generateToken(user._id, req.body.email);
        res.status(201).send({ "message":"succesfully signed in",
                                "user_id":user._id,
                                "token":token                
                        });
    } catch(err) {
        res.status(400).send({"message":"Smth went wrong", "error_message":err.message});
    }
}

const decodeToken = async (req, res) => {
    const token = req.body.token;
    const payload = Token.verifyToken(token);
    res.send(payload);
}

module.exports = {
    signUpUser,
    signInUser,
    decodeToken
}