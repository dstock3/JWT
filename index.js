//imports
const express = require("express");
const mongoose = require('mongoose');

//connect to DB
mongoose.connect(
    process.env.URI_STRING,
    { useNewUrlParser: true },
    ()=> console.log("connected to db"));

//instantiate express
const app = express();

//import routes
const authRoute = require('./routes/auth');

///Route middlewares

//Everything in the auth route is going to have the prefix '/api/user'
app.use('/api/user', authRoute);

app.listen(3003, () => console.log("Server is running"))