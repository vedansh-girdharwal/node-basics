const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ProductName:{
        type:String,
        required:true
    },
    ProductCategory:{
        type:String
    },
    ProductPrice:{
        type:Number,
        required:true
    },
    ProductImage:[mongoose.Schema.Types.Mixed],
    addedOn:{
        type:Number,
        required:true,
        default: new Date().getTime()
    }
});

module.exports = mongoose.model("Product",productSchema);