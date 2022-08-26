const mongoose=require("mongoose");

// A- craete schema object
const schema=new mongoose.Schema({
        fullName : String,
        password : String,
         email   : {type:String,unique:true,required:true},
         image   : String,
       
});


mongoose.model("teachers",schema);









