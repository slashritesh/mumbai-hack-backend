import express from "express"
const employeeRouter = express.Router()


employeeRouter.route("/").get().post()
employeeRouter.route("/:id").get().delete().patch()


export {employeeRouter}