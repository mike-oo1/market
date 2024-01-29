const mongoose = require ("mongoose");

const adminSchema = mongoose.Schema ({
    userName: {
        type: "string",
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    token: {
        type: "string"
    },
    isLogin: {
        type: Boolean,
        default: false
    }
    // stores: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "stores"
    // }],
    // products: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "products"
    // }]
}, {timeStamps: true})

const adminModel = mongoose.model("MarketGo", adminSchema);

module.exports = adminModel

