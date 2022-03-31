const express = require("express");
const app = express();

require('dotenv').config()
//configure mongoose
const mongoose = require("mongoose");
const dburl = `${process.env.DB_URL}`;

mongoose.connect(dburl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(
    ()=>console.log("MongoDB is connected 🤓")
).catch(
    (err)=>console.log(err)
);
const userRouter = require("../api/routes/user.js");
const productRouter = require("../api/routes/product.js");
const orderRouter = require("../api/routes/order.js");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//configure cors
app.use(cors());

//configure morgan
app.use(morgan("dev"));

//configure body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use("/users",userRouter);
app.use("/product",productRouter);
app.use("/order",orderRouter);

app.get("/",(req,res,next)=>{
    res.json("This working on / request");
    next();
}); 


// app.listen(4000,()=>{
//     console.log(`Server running on the port 4000`)
// })    we can create server through express also, but we have already created through http in index.js
module.exports = app;