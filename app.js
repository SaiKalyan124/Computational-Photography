//app.js
const fs = require('fs');
const multer = require('multer');
const execSync = require("child_process").execSync;

const path=require('path')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/output_images'));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
})

  
app.post('/uploadfile', upload.single('myFile'),async (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    const child=execSync('python run_model.py')
    console.log(child.toString("utf8"));
    
    console.log("from node")
   
    let directory=__dirname+"/uploads"
    res.sendFile(__dirname+"/output.html")
    
    
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
    
      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err;
        });
      }
      // directory=__dirname+"/output_images"
      // fs.readdir(directory, (err, files) => {
      //   if (err) throw err;
      
      //   for (const file of files) {
      //     fs.unlink(path.join(directory, file), err => {
      //       if (err) throw err;
      //     });
      //   }
      // });
    });
   
    

  })

  app.get("/test",async(req,res)=>{
  
   
  })

// app.post('/upload', (req, res) =>{   uploader.startUpload(req, res); })
app.listen(3000,()=>{
})