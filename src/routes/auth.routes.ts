import express from 'express'
import { currentuser, login, register } from '../controller/auth.controller'
const authRouter = express.Router()

authRouter.route("/register").post(register)
authRouter.route("/login").post(login)

authRouter.route("/user").post(currentuser)


export default authRouter