import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';

const app = express();
app.use(json());

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
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:2707/auth");
        console.log("Connected to mongo db");
    } catch (err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!');
      });
};

start();
