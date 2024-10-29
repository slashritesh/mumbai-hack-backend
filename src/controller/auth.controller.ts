import { NextFunction, Request, Response } from "express"
import { Unauthenticated } from "../errors/customError"


export const register = (req : Request,res : Response,next : NextFunction)=>{
    try {
        throw new Unauthenticated("user is not found")
    } catch (error) {
        next(error)
    }
}

export const login = ()=>{

}

export const currentuser = ()=>{

}