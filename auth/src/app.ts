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
import { errorHandler, NotFoundError } from '@tickets-blog/common';

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

export { app };
