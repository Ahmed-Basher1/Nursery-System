
const express=require("express");
const { body,param,query}=require("express-validator");
const classController=require("../Controllers/classController");
// const validationMW=require("./../Middlewares/validationMW");
const authMW=require("./../middleware/authMW");
const router=express.Router();


router.route("/class")
      .all(authMW,(request,response,next)=>{
        if(request.role=="admin")
        
        next()
        else
        {
              let error=new Error("Not authorized");
              error.status=403;
              next(error);
        }
      })
      .get(classController.getAllClasses)
      .post(classController.createClass)
      .put(classController.updateClass)
  
        router.route("/class/:id") 
        .all(authMW,(request,response,next)=>{
          if(request.role=="admin"||request.role=="teacher")
         {
          console.log(request._id);
          next()
         }
          else
          {
                let error=new Error("Not authorized");
                error.status=403;
                next(error);
          }
        })
        .get(classController.getClassById)
        .delete(classController.deleteClass)
        router.route("/classTeacher/:id") 
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
        .get(classController.getTeacherClassById)
        router.get("/classchildern/:id",classController.getChildernclassById)

module.exports=router;
