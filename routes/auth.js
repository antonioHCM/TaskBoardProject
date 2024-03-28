const router = require('express').Router();
const User = require('../models/user');
const {registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Registration route
router.post("/register", async (req, res) =>{

    //validate use input
    const  {error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message});
    }
    //check email availability
    const emailExists = await User.findOne({email: req.body.email})

    if(emailExists){
        return res.status(400).json({ error: "Email already exists"});

    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    //create user obj and save in the DB
    const userObject = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try{
        const savedUser = await userObject.save();
        res.json({ error: null, data: savedUser._id });
    }
    catch (error) {
        res.status(400).json({ error })
    }
});

    
//Log in route
router.post("/login", async (req, res) =>{
    
   //validate user input
   const  {error } = loginValidation(req.body);
   if (error) {
    return res.status(400).json({ error: error.details[0].message });
}
    //valid log in 
const user = await User.findOne({ email: req.body.email });

    //throw error if email is wrong 
if (!user) {
    return res.status(400).json({ error: "Wrong email" });
}

    //user exists password check
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    //wrong password
    if (!validPassword) {
        return res.status(400).json({ error: "Wrong password" });
    }
    //auth token
    const token = jwt.sign
    (
        {
            name: user.name,
            id: user._id
        },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }, 
    );

    res.header("auth-token", token).json({
        error: null,
        data: { token }
    })
});

module.exports = router;