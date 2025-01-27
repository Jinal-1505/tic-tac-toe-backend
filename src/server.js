import express from 'express';
import indexRouter from './routes/index.route.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', indexRouter);

mongoose
    .connect(mongo_url)
    .then(async () => {
        console.log('Database Connected Successfully');
    })
    .catch((error) => console.log('Database Connection failed', error));

app.listen(port, () => console.log(`App is running on port ${port}`));
