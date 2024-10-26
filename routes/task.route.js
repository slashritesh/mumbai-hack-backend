import express from "express"
import {getSingleTask,updateTask,createTask, deleteTask, getTaskbyManager } from "../controllers/task.controller.js"
const taskrouter = express.Router()
import {isAuthenticated, isManger} from "../middleware/authMiddleware.js"

taskrouter.route("/").post(isAuthenticated,isManger,createTask)
taskrouter.route("/manager").get(isAuthenticated,isManger,getTaskbyManager)
taskrouter.route("/:id").get(getSingleTask).delete(deleteTask).patch(updateTask)



export {taskrouter} 