import { Router } from "express";
import * as listController from "../controller/listController.js"

const listRoute = Router()
listRoute.get("/", listController.displayList)


export default listRoute