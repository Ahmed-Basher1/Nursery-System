const express=require("express");
const controller=require("./../Controllers/loginController")
const route=express.Router();

route.post("/login",controller.login);
route.post("/forget-password",controller.login);



module.exports=route;