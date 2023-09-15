const mongoose = require("mongoose");
const schema = mongoose.Schema; //structure provide garxa
const userSchema = new schema(
    {
        name: {
            type: String,
            required: false,
            trim: true,
            min: 3,
            max: 20, //nadida ni hunxa
        },
        email: {
            type: String,
            required: true,
            trim: true, //white space lae hataunee
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"], //array jastai store garxa, mongose ko default
            default: "user",
        },
        age: {
            type: Number,
        },
        contactNumber: {
            type: String,
        },
        // profilePicture: {
        //     type: String,  //picture ko url store garxau
        // },
    },
    { timestamps: true}  // kun time ma create vako , kun time ma update vako herxa
);
module.exports = mongoose.model("User", userSchema); //structure 
