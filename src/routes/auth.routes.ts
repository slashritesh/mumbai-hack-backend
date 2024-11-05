import express from 'express'
import { getuser, login, register } from '../controller/auth.controller'
import { isAuthenticate } from '../middleware/authmiddleware'
const authRouter = express.Router()

authRouter.route("/register").post(register)
authRouter.route("/login").post(login)

authRouter.route("/user").get(isAuthenticate,getuser)


export default authRouter