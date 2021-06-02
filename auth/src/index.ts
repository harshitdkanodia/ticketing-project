import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/singin';
import { errorHandler } from './middlewares/error.handler';
import mongoose from 'mongoose';


const app = express();
require("express-async-errors");
app.use(json());
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(errorHandler);
const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Connected to mongodb!");
    } catch (err) {
        console.log(err);
    }

}

start();
app.listen(3000, () => {
    console.log("Server running on port 3000!!");
})