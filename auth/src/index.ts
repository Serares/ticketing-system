import express from 'express';
// this library will help express catch error that
// are thrown from inside async functions
// without it we should use next(err)
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
    signed: false
}));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// we can throw errors from async functions because of express-async-errors package
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
// it's going to catch all thrown errors because
// of the way express works
app.use(errorHandler);

// if we connect to a database from the url, mongoose will 
// automatically crete that database
// after the last fwd slash
const start = async () => {
    if(!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to mongo db");
    } catch (err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!');
      });
};

start();
