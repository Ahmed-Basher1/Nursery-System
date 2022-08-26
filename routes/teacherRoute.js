
const express=require("express");
const { body,param,query}=require("express-validator");
const upload = require("../Controllers/teacherController");
const controller=require("../Controllers/teacherController");
const validationMd = require("../middleware/validationMd");
const router=express.Router();
const authMW=require("./../middleware/authMW");


router.route("/teacher")
      .get(controller.getAllTeacher)
      .all(authMW,(request,response,next)=>{
            if(request.role=="admin")
           {
            console.log(request.id);
            next()
           }
            else
            {
                  let error=new Error("Not authorized");
                  error.status=403;
                  next(error);
            }
          })
      .post([
        body("fullName").optional().isString().withMessage("full name should be string"),
        body("password").optional().isStrongPassword().withMessage("passsword should be strong"),
        body("email").optional().isEmail().withMessage("email should be email"),
        body("image").optional().isString().withMessage("image should be string"),
                
  ],
  validationMd,
  controller.createTeacher)
  .put([
        body("fullName").optional().isString().withMessage("full name should be characters"),
        body("password").optional().isStrongPassword().withMessage("passsword should be strong"),
        body("email").optional().isEmail().withMessage("email should be email"),
        body("image").optional().isString().withMessage("image should be string"),
               
  ],
  validationMd,
  controller.updateTeacher)
  
        router.route("/teacher/:id")  
        .all(authMW,(request,response,next)=>{
            if(request.role=="admin"||request.id== request.params.id)
           {
            console.log(request.id);
            next()
           }
            else
            {
                  let error=new Error("Not authorized");
                  error.status=403;
                  next(error);
            }
          })
        .get(controller.getTeacherById)
        .delete(controller.deleteTeacher)
        .put(controller.updateTeacher)
        router.post("/teacher/upload/:id",
        controller.uploadTeacherImage)

module.exports=router;
