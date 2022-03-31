const express = require("express");
const router = express.Router();

const {user_signup,get_all_users,get_single_user,update_a_user,delete_a_user,user_login} = require("../controllers/user.js");
const checkAuth = require("../middleware/auth-check.js")

//create user
router.post("/signup",user_signup);

//login user
router.post("/login",user_login);

//get all users
router.get("/",get_all_users);
//get single user
router.get("/:userId",checkAuth,get_single_user);

//update single user
router.patch("/:userId",checkAuth,update_a_user);

//delete single user
router.delete("/:userId",checkAuth,delete_a_user);

module.exports = router;