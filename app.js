const express=require('express');
const app=express();
const port = 5000;

const mongoose=require('mongoose');
const connectDB=require('./config/db');
userRoutes = require("./Routes/userRoutes");
productRoutes = require("./Routes/productRoutes");
const loginRoutes = require("./Routes/register_loginRoutes");
const profileRoutes = require("./Routes/profileRoutes");

connectDB();
app.use(express.json());

//make public folder static
app.use("/public", express.static(__dirname + "/public"));

//use router by express
app.use(userRoutes);
app.use(productRoutes);
app.use(loginRoutes);
app.use(profileRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

