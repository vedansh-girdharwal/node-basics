const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    try{
        console.log("verification -=-=-=-= ");
        let headertoken=req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(headertoken,"Vedansh");
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message:"auth failed"
        })
    }
}