
const express=require("express");
const { body,param,query}=require("express-validator");
const upload = require("../Controllers/childController");
const childController=require("../Controllers/childController");
 const validationMd=require("./../middleware/validationMd");
 const authMW=require("./../middleware/authMW");

const router=express.Router();

router.route("/child")
      .all(authMW,(request,response,next)=>{
        if(request.role=="admin"||request.role=="teacher")
        {
        next()
      }
        else
        {
              let error=new Error("Not authorized");
              error.status=403;
              next(error);
        }
      })
      .get(childController.getAllchilds)
      .post([
         body("fullName").optional().isString().withMessage("full name should be string"),
         body("age").optional().isNumeric().withMessage("age should be number"),
         body("Level").optional().isString().withMessage("Levels should be string"),
         body("address").optional().isObject().withMessage("adress should be object"),
                 
   ],
   validationMd,childController.createChild)
      .put([
        body("fullName").optional().isString().withMessage("full name should be string"),
        body("age").optional().isNumeric().withMessage("age should be number"),
        body("Level").optional().isString().withMessage("Levels should be string"),
        body("address").optional().isObject().withMessage("adress should be object"),
      ],childController.updateChild)
        router.route("/child/:id")        
        .all(authMW,(request,response,next)=>{
          if(request.role=="admin"||request.role=="teacher")
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
        .get(childController.getchildById)
        .delete(childController.deleteChild)

        router.post("/child/upload/:id",
        childController.uploadChildImage)


module.exports=router;
