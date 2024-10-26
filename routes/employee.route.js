import express from "express"
import { getAllEmployeeByManager } from "../controllers/employee.controller.js"
import {isAuthenticated,isManger} from "../middleware/authMiddleware.js"
const employeeRouter = express.Router()


employeeRouter.route("/manager").get(isAuthenticated,isManger,getAllEmployeeByManager)

employeeRouter.route("/:id").get().delete().patch()


export {employeeRouter}