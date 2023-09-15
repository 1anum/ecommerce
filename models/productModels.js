const mongoose = require("mongoose");
const schema = mongoose.Schema;
const productSchema = new schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        company: {
            type: String,
            required: true,
        },
    },
    { timestamps: true}  
    );
    module.exports = mongoose.model("Product", productSchema);
