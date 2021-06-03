import express , {Request,Response} from 'express';
import { body,validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/RequestValidationError';
import { DatabaseConnectionError } from '../errors/DatabaseConnectionError';
import {User} from '../models/user';
import BadRequestError from '../errors/BadRequestError';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/api/users/signup',[
    body('email')
    .isEmail()
    .withMessage("E-mail is mandatory"),
    body("password")
    .trim()
    .isLength({min:4 , max:20})
    .withMessage("Password must be between 4 and 20 characters")
], async (req: Request,res: Response)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    }

    const {email,password} = req.body;
    const existingUser = await User.findOne({
        email: email
    });
    if(existingUser){
        throw new BadRequestError("A user already exists with the same E-mail address!");
    }
    console.log("Creating a user...");
    const user = User.build({
        email,password
    });
    await user.save();
    console.log("User created!");
    const token = jwt.sign({
        id: user.id,
        email: user.email
    },process.env.JWT_TOKEN!);
    req.session = {
        jwt: token
    };
    res.status(201).send(user);

});

export { router as signupRouter };