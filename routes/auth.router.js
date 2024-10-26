import express from "express"
import { register,login, joinAsEmployee } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/join-as-employee",joinAsEmployee)
authRouter.route("/login").post(login)




export {authRouter}