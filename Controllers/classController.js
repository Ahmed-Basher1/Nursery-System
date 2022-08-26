const mongoose=require("mongoose");
require("../model/class");
let classes=mongoose.model("class");


module.exports.getAllClasses = (req,res,next)=>{
  classes.find().populate({path:"supervisor",select:"fullName email"})
  .populate({path:"childerns"})
  //{name:1,email:1}        z
  .then(data=>{
            console.log();
              res.status(200).json(data);
              
          })
          .catch(error=>next(error))
}
module.exports.getClassById = (req,res,next)=>{
    classes.findOne({_id:req.params.id})
    .then(data=>{
      if(data==null) next(new Error(" classes not found"))
      res.status(200).json(data);

    })
    .catch(error=>{
      next(error);
    })
  
}
module.exports.getTeacherClassById = (req,res,next)=>{
  classes.findOne({supervisor:req.params.id})
  .then(data=>{
    if(data==null) next(new Error(" classes not found"))
    res.status(200).json(data.name);
  })
  .catch(error=>{
    next(error);
  })

}
module.exports.getChildernclassById = (req,res,next)=>{
  classes.findOne({"childerns":req.params.id})
  .then(data=>{
    console.log(data.childerns[1])
    if(data==null) next(new Error(" classes not found"))
    res.status(200).json(data);
  })
  .catch(error=>{
    next(error);
  })

}


module.exports.createClass = (req,res,next)=>{
  console.log(req.body.childerns)
    let object=new classes({
        _id:Math.random()*1000000000000000000,
        name:req.body.name,
        supervisor:req.body.supervisor,
        childerns:req.body.childerns
        
      });
      object.save()
            .then(data=>{
              res.status(201).json({data:"added"});
            })
            .catch(error=>next(error))
}

module.exports.updateClass=(req,res,next)=>{

  classes.findOne({_id:req.body.id})
  .then(data=>{ 
      for (const property in req.body) {
          if(property == "childerns"){
             data.childerns.push(...req.body[property])
          }
          data[property] = req.body[property]
      }
      return data.save().then((data)=>res.status(200).json({message:"updated"}));
  })
  .catch(error=>{
    next(error);
  })

  }
  module.exports.deleteClass=(req,res,next)=>{

    classes.findByIdAndDelete({_id:req.params.id}).then(data=>{
      res.status(200).json({message:"deleted"});
    })

    .catch(error=>next(error))
 
   }