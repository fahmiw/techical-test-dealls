import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import 'dotenv/config'

const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    if(process.env.NODE_ENV == 'production'){
        console.log(`Server is running on ${process.env.PROD_HOST}.`);
    } else {
        console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}.`);
    }
});

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());