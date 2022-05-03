//app.js
const fs = require('fs');
const multer = require('multer');
const execSync = require("child_process").execSync;

const path=require('path')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
    const child=execSync('python imageProcess.py')
    console.log(child.toString("utf8"));
    // console.log(x.toString())
    // childPython.stdout.on('data',(data)=>{
    //     console.log("df")
    // })
    console.log("from node")
      res.send(file)
    
  })
// app.post('/upload', (req, res) =>{   uploader.startUpload(req, res); })
app.listen(3000,()=>{
})