const mongoose = require("mongoose");
const schema = mongoose.Schema; //structure provide garxa
const profileSchema = new schema(
    {
        user: {
            type: schema.Types.ObjectID,
            ref: "users",
        },
        name: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
        },
        profilepic: {
            type: String,
        },
        address: {
            type: String,
        },
        dob: {
            type: Date,
        }
    },
    {timestamps:true}
);
module.exports = mongoose.model("profile", profileSchema);