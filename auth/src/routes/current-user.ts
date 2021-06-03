import express from 'express';
import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/BadRequestError';
import { getCurrentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser',getCurrentUser,(req,res)=>{
    if(req.currentUser){
        res.status(200).send({currentUser : req.currentUser});
    } else {
        res.send({currentUser:null});
    }
});

export { router as currentUserRouter };