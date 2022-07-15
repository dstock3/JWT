//Authentication routes
const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation }= require('../validation');

router.post('/register', async (req, res) => {
    //Validate data
    const { error } = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user is already in db
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send('Email already exists.');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save()
        res.send({ user: user._id })
    } catch(err) {
        res.status(400).send(err)
    }
});

//Login
router.post('/login', async (req, res) => {
    //Validate data
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    //Check if user exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email does not exist.');

    //Check if pw is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Password is wrong.')

    //Create and assign a token
    const token = jwt.sign({ _id: user.id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)
});

module.exports = router;
