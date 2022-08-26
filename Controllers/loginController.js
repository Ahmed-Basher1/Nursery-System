const mongoose=require("mongoose");
require("../model/teacher");
let Teacher=mongoose.model("teachers");
const jwt=require("jsonwebtoken");
module.exports.login=(request,response,next)=>{
    if(request.body.email == "admin@admin.com" &&  request.body.password == "123" ){
        let token=jwt.sign({
            role:"admin"
         },
         process.env.secret,{expiresIn:"1h"})

         response.status(200).json({token,message:"login"});
    }
    else{
        console.log(request.body);
    Teacher.findOne(
                    {email:request.body.email
                    ,password:request.body.password}
                    ).
            then(data=>{
              
                if(!data)

                {
                    let error =new Error("username or password incorrect")
                    error.status=401;
                    throw error;
                }
                let token=jwt.sign({
                   id:data._id,
                   role:"teacher"
                },
                process.env.secret,{expiresIn:"1h"})

                response.status(200).json({token,message:"login"});
            })
            .catch(error=>next(error));
}
}



module.exports.forgetPassword= (req,res,next)=>{

    Teacher.findOne({email:req.body.email}).then(

        
    )

    .catch(error=>next(error))

}