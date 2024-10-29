import { json, NextFunction, Request, Response } from "express";
import { Unauthenticated } from "../errors/customError";
import jwt, { JwtPayload } from "jsonwebtoken"


export const isAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.accesstoken ?? req.headers.authorization?.split(" ")[1]

        if (!token) {
            throw new Unauthenticated("User is not Authenticated!!")
        }

        const decode = await jwt.verify(token,process.env.JWT_SECERT) as JwtPayload

        // TODO : some chnages required

        req.user = decode.user

    } catch (error) {
        console.log(error);
        next(error)
    }
}



export const roles = (roles: [string]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            throw new Unauthenticated("User is not Authenticate!!")
        }

        next()

    }
}