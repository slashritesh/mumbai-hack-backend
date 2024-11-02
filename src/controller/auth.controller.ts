import { json, NextFunction, Request, Response } from "express"
import { BadRequestError, Unauthenticated, Unauthorized } from "../errors/customError"
import bcrypt from "bcryptjs"
import prisma from "../lib/db"
import { StatusCodes } from "http-status-codes"
import { getaccessToken, getRefreshToken } from "../lib/generatetokens"
import jwt, { JwtPayload } from "jsonwebtoken"





export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { org_name , industry , org_email,password} = req.body

        if (!org_email || !password || !industry || !org_name) {
            throw new BadRequestError("Invalid Credentials!!")
        }

        const existinguser = await prisma.organization.findFirst({where:{org_email}})

        if (existinguser) {
            throw new Unauthenticated("Organization is Already, Registered!!")
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const created_org = await prisma.organization.create({
            data: {
                org_email,
                org_name,
                industry,
                password: hashpassword
            }
        })

        res.status(StatusCodes.CREATED).json({ message: "Register User Sucessfully", org: created_org })

    } catch (error) {
        next(error)
    }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { org_email,password} = req.body

        if (!org_email || !password) {
            throw new BadRequestError("Credentials Required!!")
        }

        const existinguser = await prisma.organization.findFirst({ where: { org_email } })

        if (!existinguser) {
            throw new Unauthenticated("User not found,Sign up First!")
        }

        const isvalidpassword = await bcrypt.compare(password,existinguser.password)

        if (!isvalidpassword) {
            throw new Unauthenticated("Invalid Credentials")
        }

        // TODO : Cokkie 
        const payload = {
            id : existinguser.id,
            email : existinguser.org_email
        }

        const accessToken = getaccessToken(payload)
        const refreshToken = getRefreshToken(payload)

        res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:true})

        res.status(StatusCodes.CREATED).json({message : "Organization logged in Sucessfully",token : accessToken})

    } catch (error) {
        next(error)
    }
}


export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            throw new Unauthorized("token must required")
        }

        const decode = jwt.verify(refreshToken,process.env.REFRESHTOKEN_SECERT) as JwtPayload

        const existingUser = await prisma.organization.findUnique({where:{id:decode.id}})

        if (!existingUser) {
            throw new Unauthenticated("User not found");
        }

        const payload = {
            id : existingUser.id,
            email : existingUser.org_email
        }

        const newAcesstoken = getaccessToken(payload)

        res.status(StatusCodes.OK).json({
            token : newAcesstoken
        })

    } catch (error) {
        
    }
}

export const currentuser = () => {

}