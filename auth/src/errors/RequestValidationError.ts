import { ValidationError } from 'express-validator';
import {CustomError} from './CustomError';
export class RequestValidationError extends CustomError{
    statusCode=400;
    constructor(public errors: ValidationError[]){
        super("Error : Invalid parameters passed");
        Object.setPrototypeOf(this,RequestValidationError.prototype); // writing this because we're extending a built in class

    }

    serializeErrors(){
        return this.errors.map((err)=>{
            return { message: err.msg, field: err.param};
        });
    }
}