import * as  listService from "../services/listService.js"

export const displayList = async(req,res) =>{
 try {
    const result = await listService.displayList()
    console.log(result)
    res.json(result)
    
 } catch (error) {
    res.status(500).json({message: error.message})
 }
}