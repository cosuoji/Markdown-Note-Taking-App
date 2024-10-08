import express from "express";
import uploadRoute from "./routes/uploadRoute.js"
import listRoute from "./routes/listRoute.js";
import cors from 'cors'



const app = express();
const PORT = 9000
app.use(cors())
app.use(express.json())
app.set("view engine", 'ejs')
app.set("views", "./views")

app.use(express.urlencoded())
app.use("/uploads",uploadRoute)
app.use("/listNotes",listRoute)

//catch other routes
app.all("*", (req, res )=>{
    res.status(404);
    res.json({
        message: "Not Found"
    })
})


app.listen(PORT, _ =>{
    console.log("Markdown App is running on PORT", PORT)
})