import { json, NextFunction, Request, Response } from "express";
import { Unauthenticated } from "../errors/customError";
import jwt, { JwtPayload } from "jsonwebtoken"
import { UserPayload } from "../@types/express";



export const isAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || null
        

        if (!token) {
            throw new Unauthenticated("User is not Authenticated!!")
        }

        const decode = await jwt.verify(token,process.env.ACCESSTOKEN_SECERT as string) as JwtPayload

        if (!decode) {
            throw new Unauthenticated("User is not Authenticated!!")
        }

        const userPayload = {
            email : decode.email,
            id : decode.id,
            role : decode.role
        }
        

        req.user = userPayload as UserPayload
        
        next()

    } catch (error) {
        console.log(error);
        next(error)
    }
}



// export const roles = (roles: [string]) => {
//     return (req: Request, res: Response, next: NextFunction) => {

//         if (!req.user) {
//             throw new Unauthenticated("User is not Authenticate!!")
//         }

//         next()

//     }
// }