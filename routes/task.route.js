import express from "express"
import { getAllTasks,getSingleTask,updateTask,createTask, deleteTask } from "../controllers/task.controller.js"
const taskrouter = express.Router()
import {isAuthenticated, isManger} from "../middleware/authMiddleware.js"

taskrouter.route("/").get(getAllTasks).post(isAuthenticated,isManger,createTask)
taskrouter.route("/:id").get(getSingleTask).delete(deleteTask).patch(updateTask)



export {taskrouter} 