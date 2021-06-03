import express, { Request, Response } from 'express';
import {User} from '../models/user';
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';
import { validateRequest } from '../middlewares/validate-requests';
import BadRequestError from '../errors/BadRequestError';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signin',[
    body('email')
    .isEmail()
    .withMessage('Invalid E-mail!'),
    body('password')
    .trim()
    .isLength({min:4 , max:20})
    .withMessage("Password must be between 4 and 20 characters")
],validateRequest,async (req:Request,res:Response)=>{
    const {email,password} = req.body;
    const existingUser = await User.findOne({email:email});
    if(!existingUser){
        throw new BadRequestError("Invalid credentials!");
    }
    const passwordMatch = await bcrypt.compare(password,existingUser.password);
    if(passwordMatch){
        const token = jwt.sign({
            id : existingUser.id,
            email : existingUser.email,
        },process.env.JWT_TOKEN!);
        req.session = {
            jwt: token
        };
        res.status(200).send(existingUser);
    } else {
        throw new BadRequestError("Invalid credentials!");
    }

});

export { router as signinRouter };