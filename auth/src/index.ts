import mongoose from 'mongoose';
import { app } from './app';

// if we connect to a database from the url, mongoose will 
// automatically crete that database
// after the last fwd slash
const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    console.log("JWT SECRET ->", process.env.JWT_KEY)
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
