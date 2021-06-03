import express from 'express';
import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/BadRequestError';
import { getCurrentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/users/currentuser',getCurrentUser,requireAuth,(req,res)=>{
    res.status(200).send({currentUser : req.currentUser});
});

export { router as currentUserRouter };