import ErrorWithStatus from "../exceptions/errorStatus.js";
import fs from "fs"
import { fileURLToPath } from 'url';
import path from "path";
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const directoryPath = path.join(__dirname, '../uploads');

let list =  fs.readdirSync(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    return {
        message: files
    }
  })


export const displayList = async() =>{
    try {
  
           return {
            "List Of": list
        }


    } catch (error) {
        throw new ErrorWithStatus(error.message, 500)
    }
}
