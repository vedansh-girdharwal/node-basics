// const NameofStudent = "Vedansh";
// module.exports = NameofStudent

console.log("this is coming from Node JS which is a javascript runtime");

const http = require("http");
// var ImportedFromIndex = require("../index.js");
// console.log(ImportedFromIndex);

const app = require("./src/app.js");
// http.createServer(function (req,res){
    //     res.writeHead(200,{'Content-Type':'text/plain'});
    //     res.write("This is coming from the Nodemon server we created");
    //     res.end();
    // }).listen(PORT);

const PORT = process.env.PORT || 4000;
const server = http.createServer(app)
server.listen(PORT,()=>{
    console.log(`server running on port ${PORT} 🛰`);
});