import { Task } from "../models/Task.js"; // Adjust the path as necessary
import { Manager } from "../models/Manager.js"; // Adjust the path as necessary

export const createTask = async (req, res) => {
    const { name, priority, skillMatch, deadline, status, assignedTo } = req.body;
    
    
    try {
        const manager = await Manager.findOne({ userid : req.user.id });
        
        if (!manager) {
            return res.status(404).json({ message: "Manager or organization not found." });
        }

  
        // Ensure required fields are provided
        if (!name || !priority || !skillMatch || !deadline || !status) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Create a new Task instance
        const newTask = await Task.create({
            name,
            priority,
            skillMatch,
            deadline,
            status,
            assignedTo
        });


        const updated = await Manager.findByIdAndUpdate(manager._id, {
            $push: { alltasks: newTask._id } // Add the new employee to the manager's list
        });

        

        // Send a success response
        res.status(201).json({ message: "Task created and added to manager successfully", task: newTask,updated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the task" });
    }
};




export const getAllTasks = (req,res)=>{
    res.json({msg:"get all tasks"})
} 

export const getSingleTask = (req,res)=>{
    res.json({msg:"get single task by id"})
} 

export const deleteTask = (req,res)=>{
    res.json({msg:"delete task"})
} 

export const updateTask = (req,res)=>{
    res.json({msg:"update task"})
} 