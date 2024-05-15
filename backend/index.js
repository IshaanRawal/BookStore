import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import { Book } from './models/bookmodel.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));

// app.use(
//     cors({
//         origin: 'http://localhost:8000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to the Real World Ishaan!')
});

app.use('/books',booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('App Connected to Database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });

    })
    .catch((error)=> {
        console.log(error);
    });

