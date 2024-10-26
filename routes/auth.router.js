import express from "express"
import { register,login, joinAsEmployee, currentUser } from "../controllers/auth.controller.js"
import {isAuthenticated} from "../middleware/authMiddleware.js"

const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.get("/user",isAuthenticated,currentUser)
authRouter.post("/join-as-employee",joinAsEmployee)
authRouter.route("/login").post(login)




export {authRouter}