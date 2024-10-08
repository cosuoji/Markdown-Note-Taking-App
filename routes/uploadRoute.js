import { Router } from "express";
const uploadRoute = Router()
import multer from 'multer'
import path from "node:path"
import ErrorWithStatus from "../exceptions/errorStatus.js";
import showdown from "showdown"
import fs from "fs"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const converter = new showdown.Converter();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }})

// Check file type
function checkFileType(file, cb) {
  const filetypes = /md/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //const mimetype = filetypes.test(file.mimetype);

  if (extname) {
    return cb(null, true);
  } else {
    cb('Error: Markdown Files Only! (md)');
  }
}  

uploadRoute.get("/", (req, res)=>{
    res.render("upload.ejs")
})


uploadRoute.post("/", uploadStorage.single("file"), (req, res) => {
    try {
      fs.readFile(__dirname + "/../" + `/${req.file.path}`, 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        let text = data;
        let html = converter.makeHtml(text)

        let htmlExt = req.file.filename.split(".")[0] + ".html"
        
        fs.writeFile(__dirname + "/../" + `/uploads/html/${htmlExt}`, html, err=>{
          if(err){
            console.error(err)
          }
          else{
            res.redirect(`/uploads/${htmlExt}`)
          }
        })
      
      });

      res.status(200)
        
    } catch (error) {
      throw new ErrorWithStatus(error.message, 500)
    }
})


uploadRoute.get("/:html", (req, res)=>{
  let folderToScan = __dirname + "/../" + "/uploads/html/"
  
  let list =  fs.readdirSync(folderToScan, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    return {
        message: files
    }
  })

  let htmlFile = list[list.length - 1]
  let fileToSend = path.join(folderToScan, `${htmlFile}`)
  console.log(fileToSend)
  res.sendFile(fileToSend)
})

export default uploadRoute