const express= require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const teacherRoutes = require("./routes/teacherRoute")
const childRoutes = require("./routes/ChildRoutes")
const classRoutes = require("./routes/classRoute")
const loginRoutes = require("./routes/login");
const multer = require("multer");
const path = require("path");
require("dotenv").config();


const port = process.env.Port;

mongoose.connect(process.env.DB_URL)//mongodb://localhost:27017/NuresryDB
.then(()=>{
    console.log("DB Connected")
    app.listen(port,()=>{
      console.log(`server listening at port ${port} Welcome`)
     
  })

  })
.catch(err=>console.log("Db Connection Error "+err))

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
    const urlFolder = req.url.split("/")[1]
  console.log(path.join(__dirname ))
    cb(null, `images/${urlFolder}`)
  },
  filename: function (req, file, cb) {
  
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extentionName = "."+file.originalname.split(".")[1];
    cb(null, file.fieldname + '-' + uniqueSuffix+extentionName )
  }

})
const upload = multer({storage:storage});
app.use(upload.single('images'))



app.use(morgan(':url :method :status'));
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Home page")
})
///app.use(auth)   // adminAuth
// app.use('/admin',teacherRoutes);
app.use(loginRoutes)
app.use(teacherRoutes);
app.use(classRoutes);
app.use(childRoutes);

app.use(notFoundMdl);
app.use((err, req, res, next) => {
  let status=err.status||500;
  res.status(status).json({message:"Internal Error"+err});
  })


function notFoundMdl(req,res,next){
    res.status(404).send("<h1>Page not found </h1>")
    
}


// function auth(req,res,next){
//   if(req.query.admin === "true"){
//     next()
//   }
//   else{
//     res.send("sorry not auth")
//   }
//   console.log('Auth')
// }




