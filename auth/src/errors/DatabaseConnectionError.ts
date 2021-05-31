import {CustomError} from './CustomError';
export class DatabaseConnectionError extends CustomError{
    statusCode=500
    reason = 'Error connecting to database!'
    constructor(){
        super('Error connecting to database');
        Object.setPrototypeOf(this,DatabaseConnectionError.prototype); // writing this because we're extending a built in class
    }
    serializeErrors(){
        return [
            {
                message: this.reason
            }
        ]
    }
}