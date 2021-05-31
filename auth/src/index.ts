import express from 'express';
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/singin';
import {errorHandler} from './middlewares/error.handler';


const app = express();
require("express-async-errors");
app.use(json());
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Server running on port 3000!!");
})