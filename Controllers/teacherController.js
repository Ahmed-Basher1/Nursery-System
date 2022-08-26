const mongoose=require("mongoose");
require("../model/teacher");
let teacher=mongoose.model("teachers");
let multer = require("multer");
const saltRounds = 10;
const bcrypt = require('bcrypt');



module.exports.uploadTeacherImage = (req,res,next)=>{
  teacher.findOne({_id:req.params.id})
  .then(data=>{ 
        data.image = req.file.path
      return data.save().then((data)=>res.status(200).json({message:"complete uploaded image"}));
  })
  .catch(error=>{
    next(error);
  })
}






module.exports.getAllTeacher = (req,res,next)=>{
    teacher.find({})
    .then(data=>{
        res.status(200).json(data);

    })
    .catch(error=>{
      next(error);
    })
}
module.exports.getTeacherById = (req,res,next)=>{
    teacher.findOne({_id:req.params.id})
    .then(data=>{ 
      if(data==null) next(new Error(" teacher not found"))
      res.status(200).json(data);

    })
    .catch(error=>{
      next(error);
    })
}


module.exports.createTeacher = async (req,res,next)=>{
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    let object=new teacher({
      fullName:req.body.fullName,
      password:hashedPassword,
      email:req.body.email,
      image:req.body.image 
    });
    object.save()
    res.status(201).json({data:"added"});
  } catch(error){
    next(error)
  }

}

module.exports.updateTeacher=(req,res,next)=>{

    teacher.updateOne({_id:req.body.id},
                  {
                    $set:req.body
                 
                  })
                  .then(data=>{
                    res.status(200).json(data);
                  })
                  .catch(error=>next(error));

  }


  module.exports.deleteTeacher=(req,res,next)=>{

    teacher.findByIdAndDelete({_id:req.params.id}).then(data=>{
      res.status(200).json({message:"deleted"});
    })

    .catch(error=>next(error))
 
   }

   exports.updateTeacherAsync = async (req, res) => {
    try {
      console.log((req.params.id));
       await teacher.findOne(req.params.id);
      Object.assign(teacher, req.body);
      teacher.save();
      res.send({ data: teacher });
    } catch {
      console.log(req.params.id)
      res.status(404).send({ error: "teacher is not found!" });
    }
  };
  module.exports.updateTeacher = (req,res,next)=>{
      teacher.findOne({_id:req.params.id})
      .then(data=>{ 
          for (const property in req.body) {
            data[property] = req.body[property];
          }
          return data.save().then((data)=>res.status(200).json({message:"updated"}));
      })
      .catch(error=>{
        next(error);
      })
}