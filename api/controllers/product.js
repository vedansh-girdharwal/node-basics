const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const Product = require("../models/product.js");

const create_product = (req,res,next)=>{
    const product = new Product({
        _id:mongoose.Types.ObjectId(),
        ProductName:req.body.ProductName,
        ProductPrice:req.body.ProductPrice
    }).save()
    .then(result=>{
        console.log("this is creating a product");
        console.log(result);
        res.status(200).json({
            message:"product successfully created"
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is some error",
            error
        })
    })
    
    // Product.find()
    // .exec()
    // .then()
    // .catch(error=>{
    //     res.status(500).json({
    //         message:"there is some error",
    //         error
    //     })
    // })
}
const get_all_products = (req,res,next)=>{
    Product.find().exec()
    .then(
        result=>{
            console.log("this is the result of successfully getting all products");
            console.log(result);
            res.status(200).json({
                message:"getting all products",
                result
            })
        }
    )
    .catch(error=>{
            res.status(500).json({
                message:"there is some error",
                error
            })
    });
}
const get_single_product = (req,res)=>{
    const {productId} = req.params;
    Product.find({
        _id:productId
    }).exec()
    .then(result=>{
        console.log("this is the result of getting single product");
        console.log(result);
        res.status(200).json({
            message:"getting single product",
            result
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is some error",
            error
        })
    })
}
const update_product = ()=>{
    const {productId} = req.params;
    const updateOps = {};
    for(const [key,value] of Object.entries(req.body)){
        updateOps[key] = value;
    }

    Product.update({_id:productId},{$set:updateOps})
    .exec()
    .then(result=>{
        console.log("this is the result of updating single product");
        console.log(result);
        res.status(200).json({
            message:"product updated",
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is some error",
            error
        })
    })
}
const delete_product = ()=>{
    const {productId} = req.params;
    Product.remove({
        _id:productId
    })
    .exec()
    .then(result=>{
        console.log("this is the result of deleting a product");
        console.log(result);
        res.status(200).json({
            message:"product deleted"
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is some error",
            error
        })
    })
}

module.exports = {
    create_product,
    get_all_products,
    get_single_product,
    update_product,
    delete_product
}