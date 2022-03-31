const mongoose = require("mongoose");
const Order = require("../models/order.js");

const place_order = (req,res,next)=>{
    const order = new Order({
        _id:mongoose.Types.ObjectId(),
        order_name:req.body.order_Name,
        user_name:req.body.user_name,
        products:req.body.products,
        address:req.body.address,
    });
    order.save()
    .then(
        result=>{
            console.log("result ofPlacing an order");
            console.log(result);
            res.status(200).json({
                message:"order successfully placed"
            })
        }
    )
    .catch(error=>{
        res.status(500).json({
            message:"there is an error",
            error
        })
    })
}
const get_all_orders = (req,res,next)=>{
    Order.find()
    .select("products order_name user_name")
    .populate("products","ProductName ProductPrice")
    .exec()
    .then(orders=>{
        const result = {
            count:orders.length,
            message:"Getting all orders",
            orders:orders.map(order=>{
                return {
                    order,
                    request:{
                        OrderId:`http://localhost:4000/order/${order._id}`
                    }
                }
            })
        };
        res.status(200).json({
            message:"getting all orders",
            result
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is an error",
            error
        })
    });
}
const get_single_order = (req,res,next)=>{
    const {orderId} = req.params;
    Order.find({  //Order.findById(orderId).exec().then().catch()
        _id:orderId
    }).populate("products")
    .exec()
    .then(result=>{
        console.log("result of getting single order");
        console.log(result);
        res.status(200).json({
            message:"order is get",
            result
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is an error",
            error
        })
    });
}
const update_an_order = (req,res,next)=>{
    const {orderId} = req.params;
    const updates = {};
    for( const [key,value] of Object.entries(req.body)){
        updates[key] = value;
    }
    Order.update({_id:orderId},{$set:updates})
    .exec()
    .then(result=>{
        console.log("result of updating an order");
        console.log(result);
        res.status(200).json({
            message:"order successfully updated"
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is an error",
            error
        })
    })
}
const delete_an_order = (req,res,next)=>{
    const {orderId} = req.params;
    Order.remove({
        _id:orderId
    })
    .exec()
    .then(result=>{
        console.log("result of deleting an order");
        console.log(result);
        res.status(200).json({
            message:"order successfully deleted"
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"there is an error",
            error
        })
    })
}

module.exports = {
    place_order,
    get_all_orders,
    get_single_order,
    update_an_order,
    delete_an_order
}