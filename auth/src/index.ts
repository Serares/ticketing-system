import mongoose from 'mongoose';
import { app } from './app';

// if we connect to a database from the url, mongoose will 
// automatically crete that database
// after the last fwd slash
const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    if(!process.env.MONGO_URI) {
        throw new Error("No mongo uri provided");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongo db");
    } catch (err) {
        console.log(err);
    }
    app.listen(3000, () => {
        console.log('Listening on port 3000!!!!!!!!');
    });
};

start();
