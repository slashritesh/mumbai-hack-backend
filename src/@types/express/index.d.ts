import { Organization } from "@prisma/client";

export type UserPayload =  {
    id : string,
    email : string,
    role : string[]
}

declare global {
    namespace Express {
        interface Request {
            user ?: UserPayload,
        }
    }
}