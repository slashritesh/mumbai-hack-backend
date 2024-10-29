import { NextFunction, Request, Response } from "express";
import {StatusCodes} from "http-status-codes"

export interface CustomError extends Error{
    statuscode :  number
}


const errormiddleware = (err : CustomError, req : Request,res : Response,next : NextFunction)=>{
    console.log(err.stack);
    const statuscode = err.statuscode || StatusCodes.INTERNAL_SERVER_ERROR
    const message = err.message ||  "Something went wrong, Try Again!"
    res.status(statuscode).json({message,status : statuscode})
}

export default errormiddleware