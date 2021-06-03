import { CustomError } from "./CustomError";

export default class BadRequestError extends CustomError{
    statusCode=400;
    error:string;
    constructor(error:string){
        super(error);
        this.error = error;
        Object.setPrototypeOf(this,BadRequestError.prototype);
    }

    serializeErrors(){
        return [{
            message: this.error
        }]
    }
}