const mongoose=require("mongoose");

// A- craete schema object
const schema=new mongoose.Schema({
        _id : {type:Number},
        name : {type:String,unique:true,required:true},
        supervisor : {type: mongoose.SchemaTypes.ObjectId, ref: 'teachers' },
         childerns   : [{type:Number,ref:"childs"}]
    
});

//B- mapping

//setter
module.exports = mongoose.model("class",schema);









