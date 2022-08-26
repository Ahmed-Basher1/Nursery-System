const mongoose=require("mongoose");
require("../model/child");
let multer = require("multer");
let childs=mongoose.model("childs");




module.exports.uploadChildImage = (req,res,next)=>{
childs.findOne({_id:req.params.id})
.then(data=>{ 
  
      data.image = req.file.path
    return data.save().then((data)=>res.status(200)
    .json({message:"complete uploaded image"}));
})
.catch(error=>{
  next(error);
})
}









module.exports.getAllchilds = (req,res,next)=>{
    childs.find({})
    .then(data=>{
        res.status(200).json(data);

    })
    .catch(error=>{
      next(error);
    })
}
module.exports.getchildById = (req,res,next)=>{
    childs.findOne({_id:req.params.id})
    .then(data=>{
      if(data==null) next(new Error(" childs not found"))
      res.status(200).json(data);

    })
    .catch(error=>{
      next(error);
    })
}


module.exports.createChild = (req,res,next)=>{
    let object=new childs({
        _id:Math.random()*100000000,
        fullName:req.body.fullName,
        age:req.body.age,
        Level:req.body.Level,
        address:req.body.address,
      });
      object.save()
            .then(data=>{
              res.status(201).json({data:"added"});
            })
            .catch(error=>next(error))
}

module.exports.updateChild=(req,res,next)=>{

  childs.findOne({_id:req.body.id})
  .then(data=>{ 
      for (const property in req.body) {
        switch (property) {
          case "city":  data.address.city = req.body[property]
            break;
            case "street":  data.address.street = req.body[property]
            break;
            case "building":  data.address.building = req.body[property]
            break;
          default:  data[property] = req.body[property];
            break;
        }
      }
      return data.save().then((data)=>res.status(200).json({message:"updated"}));
  })
  .catch(error=>{
    next(error);
  })

  }

  module.exports.deleteChild=(req,res,next)=>{

   childs.findByIdAndDelete({_id:req.params.id})
   .then(data=>{
    res.status(200).json(data);
  })
   .catch(error=>next(error))

  }