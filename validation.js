const Joi = require('joi');
const jwt = require('jsonwebtoken');

//validating registration 

const registerValidation = (data) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(6).max(255).required(),
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(6).max(255).required(),
            
        }
    )
    return schema.validate(data);
}
//validating login
const loginValidation = (data) => {
    const schema = Joi.object(
        {
            email: Joi.string().min(6).max(255).required(),
            password: Joi.string().min(6).max(255).required(),
            
        }
    )
    return schema.validate(data);
}

//Token verification
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");

    if(!token) return res.status(401).json({error: "Access denied"})

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch{
        res.status(400).json({error: "Token not valid"});
    }
} 
module.exports = { registerValidation, loginValidation, verifyToken};