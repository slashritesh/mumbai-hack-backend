import { StatusCodes } from "http-status-codes";



export class NotFoundError extends Error {
    statuscode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.name = "NotFoundError"
        this.statuscode = StatusCodes.NOT_FOUND
    }
}

export class Unauthorized extends Error {
    statuscode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.name = "Unauthorized"
        this.statuscode = StatusCodes.FORBIDDEN
    }
}

export class Unauthenticated extends Error {
    statuscode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.name = "Unauthenticated"
        this.statuscode = StatusCodes.UNAUTHORIZED
    }
}

export class BadRequestError extends Error {
    statuscode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.name = "BadRequestError"
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}