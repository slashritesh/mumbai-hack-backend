
import { Manager } from "../models/Manager.js";




export const getAllEmployeeByManager = async (req,res,next)=>{
    try {
       
        const manager = await Manager.findOne({ userid : req.user.id }).populate({ path: 'employees',populate: { path: 'userid' } }).exec();
        
        if (!manager) {
            return res.status(404).json({ message: "Manager or organization not found." });
        }

        return res.json({data : manager.employees})
    } catch (error) {
        next(error)
    }
}

