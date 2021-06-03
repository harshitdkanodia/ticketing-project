import {Request,Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
interface UserPayload {
    id: string;
    email: string;
}

declare global{
    namespace Express{
        interface Request{
            currentUser? : UserPayload
        }
    }
}
export const getCurrentUser = (req:Request,res:Response,next:NextFunction)=>{
    if(req.session?.jwt){
        try{
            const payload = (jwt.verify(req.session.jwt,process.env.JWT_TOKEN!) as UserPayload);
            req.currentUser = payload;
        }catch(err){
            res.send({
                currentUser: null
            });
        }
    } else{
        next();
    }
    next();
}