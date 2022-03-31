const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    order_name:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    address:{
        type:String,
        required:true
    },
    placedOn:{
        type:Number,
        required:true,
        default:new Date().getTime()
    }
});

module.exports = mongoose.model("Order",orderSchema);