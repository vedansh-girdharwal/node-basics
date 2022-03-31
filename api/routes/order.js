const express = require("express");
const router = express.Router();

const {place_order,get_all_orders,get_single_order,update_an_order,delete_an_order} = require("../controllers/order.js");



//create/place an order
router.post("/",place_order);

//read/get all the data
router.get("/",get_all_orders);

//get single data
router.get("/:orderId",get_single_order);

//update any order
router.patch("/:orderId",update_an_order);

//delete any order
router.delete("/:orderId",delete_an_order);

module.exports = router;