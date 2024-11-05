import { NextFunction, Request, Response } from "express"
import { BadRequestError, Unauthenticated, Unauthorized } from "../errors/customError"
import bcrypt from "bcryptjs"
import prisma from "../lib/db"
import { StatusCodes } from "http-status-codes"
import { getaccessToken, getRefreshToken } from "../lib/generatetokens"
import jwt, { JwtPayload } from "jsonwebtoken"


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { org_name, industry, org_email, password } = req.body;

        // Check required fields
        if (!org_email || !password || !industry || !org_name) {
            throw new BadRequestError("Invalid Credentials!!");
        }

        // Check if a user with the provided email already exists
        const existingUser = await prisma.user.findUnique({ where: { email: org_email } });
        if (existingUser) {
            throw new Unauthenticated("User with this email is already registered!");
        }

        // Check if an organization with the provided email already exists
        const existingOrg = await prisma.organization.findUnique({ where: { org_email,org_name } });
        if (existingOrg) {
            throw new Unauthenticated("Organization with this email is already registered!");
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the user with an ADMIN role
        const createdUser = await prisma.user.create({
            data: {
                email: org_email,
                password: hashPassword,
                role:["ADMIN"]
            }
        });

        // Create the organization and associate it with the created user
        const createdOrg = await prisma.organization.create({
            data: {
                org_email,
                org_name,
                industry,
                user: {
                    connect: { id : createdUser.id}  // Associate user as head of the organization
                }
            }
        });

        res.status(StatusCodes.CREATED).json({
            message: "Organization Registered Successfully",
            org: createdOrg,
            user: createdUser
        });

    } catch (error) {
        next(error);
    }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email ,password} = req.body

        console.log(req.body);

        if (!email || !password) {
            throw new BadRequestError("Credentials Required!!")
        }

        

        const existinguser = await prisma.user.findFirst({ where: { email } })

        if (!existinguser || !existinguser.role.includes("ADMIN")) {
            throw new Unauthenticated("User Not Found,Sign up First!")
        }

        const isvalidpassword = await bcrypt.compare(password,existinguser.password)

        if (!isvalidpassword) {
            throw new Unauthenticated("Invalid Credentials")
        }

        // TODO : Cokkie Sending
        const payload = {
            id : existinguser.id,
            email : existinguser.email,
            role : existinguser.role
        }

        const accessToken = getaccessToken(payload)
        const refreshToken = getRefreshToken(payload)

        res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:true})

        res.status(StatusCodes.CREATED).json({
            message : "Organization logged in Sucessfully",
            token : accessToken,
            user : payload
        })

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

        const decode = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET!) as JwtPayload

        const existingUser = await prisma.user.findUnique({where:{id:decode.id}})

        if (!existingUser) {
            throw new Unauthenticated("User not found");
        }

        const payload = {
            id : existingUser.id,
            email : existingUser.email,
            role : existingUser.role
        }

        const newAcesstoken = getaccessToken(payload)

        res.status(StatusCodes.OK).json({
            token : newAcesstoken
        })

    } catch (error) {
        next(error)
    }
}

export const getuser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userid = req.user?.id

        const organization = await prisma.organization.findUnique({
            where : {userid},
            include : {
                user : true
            }
        })

        if (!organization) {
            throw new Unauthorized("Permission denied")
        }
        
        res.json({...organization})
        
    } catch (error) {
        next(error)
    }
}


export const cheaktoken = ()=>{
    
}