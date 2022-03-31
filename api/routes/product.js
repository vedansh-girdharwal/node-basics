const express = require("express");
const router = express.Router();

const {create_product,get_all_products,get_single_product,update_product,delete_product} = require("../controllers/product.js");

//create a product
router.post("/",create_product);

//get all products
router.get("/",get_all_products);

//get single product
router.get("/:productId",get_single_product);

//update a product
router.patch("/:productId",update_product);//patch only updates only what provided, Put overrides the whole

//delete a product
router.delete("/:productId",delete_product);

module.exports = router;