import { NextFunction, Request, Response } from "express"
import { BadRequestError, Unauthenticated } from "../errors/customError"
import bcrypt from "bcryptjs"
import prisma from "../lib/db"
import { StatusCodes } from "http-status-codes"


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, fullname } = req.body

        if (!email && !password && !fullname) {
            throw new BadRequestError("Invalid Credentials!!")
        }

        const existinguser = await prisma.user.findUnique({ where: { email } })

        if (existinguser) {
            throw new Unauthenticated("User is Already, Registered!!")
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const createduser = await prisma.user.create({
            data: {
                email,
                fullname,
                password: hashpassword
            }
        })

        res.status(StatusCodes.CREATED).json({ message: "Register User Sucessfully", user: createduser })

    } catch (error) {
        next(error)
    }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        if (!email && !password) {
            throw new BadRequestError("Credentials Required!!")
        }

        const existinguser = await prisma.user.findUnique({ where: { email } })

        if (!existinguser) {
            throw new Unauthenticated("User not found,Sign up First!")
        }

        const isvalidpassword = await bcrypt.compare(password,existinguser.password)

        if (!isvalidpassword) {
            throw new Unauthenticated("Invalid Credentials")
        }

        // TODO : Cokkie passowrd

        


    } catch (error) {
        next(error)
    }
}


export const currentuser = () => {

}