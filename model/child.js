const mongoose=require("mongoose");

// A- craete schema object
const schemaAddress=new mongoose.Schema({
    
    city : {type:String},
    street : {type : String},
    building : {type : String}
    
});
const schema=new mongoose.Schema({
        _id : {type:Number,required:true},
        fullName : {type:String,required:true},
        age : {type : Number},
        Level : {type : String,enum:['PreKG','KG1','KG2'],default: 'PreKG'},
        address: schemaAddress,
        image: {type:String, default:"images\\child_images\\1.png"}
});


//B- mapping

//setter
mongoose.model("childs",schema);









