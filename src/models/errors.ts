import * as httpStatus from 'http-status';
import { Errors } from 'typescript-rest';


export abstract class ExtendedError extends Errors.HttpError{
    constructor(
        name: string,
        statusCode: number,
        description: string,
        public info?: string,
        public body?: any
    ) {
        super(name, description);
    }
}
interface ErrorParams {
    description: string;
    info?: string;
    body?: any;
}

export class BadRequestError extends ExtendedError {
    constructor({description, info, body}: ErrorParams) {
        super('BadRequestError', httpStatus.BAD_REQUEST, description, info, body);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class InternalServerError extends ExtendedError {
    constructor({description, info, body}: ErrorParams) {
        super('BadRequestError', httpStatus.INTERNAL_SERVER_ERROR, description, info, body);
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
}
