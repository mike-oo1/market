const mongoose = require ("mongoose");

const productSchema = mongoose.Schema ({
    stores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "stores"
    }],

    productName: {
            type: "string",
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        productID: {
            type: "string",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        category: {
            type: "string",
            required: true
        }

    },
   


   


    
   
 {timeStamps: true})

const adminModel = mongoose.model("product", productSchema);

module.exports = adminModel