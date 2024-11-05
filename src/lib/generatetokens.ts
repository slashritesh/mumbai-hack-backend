import jwt from "jsonwebtoken"

interface TokenPayload {
    id : string
    email : string
}

export const getaccessToken = (payload : TokenPayload)=>{
    return jwt.sign(payload,process.env.ACCESSTOKEN_SECERT as string,{
        expiresIn : process.env.ACCESSTOKEN_EXPIRESIN,
    })
}

export const getRefreshToken = (payload : TokenPayload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET as string,{
        expiresIn : process.env.REFRESHTOKEN_EXPIRESIN
    })
}


