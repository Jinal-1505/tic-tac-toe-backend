import express from 'express';
import http from 'http';
import indexRouter from './routes/index.route.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { gameSocket } from './sockets/game.socket.js';

dotenv.config();
const app = express();
const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT || 3000;

//Create HTTP Server and Websocket Server
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

//Initialize WebSocket Events
gameSocket(io);

app.use(express.json());
app.use('/api', indexRouter);

mongoose
  .connect(mongo_url)
  .then(async () => {
    console.log('Database Connected Successfully');
  })
  .catch((error) => console.log('Database Connection failed', error));

server.listen(port, () => console.log(`App is running on port ${port}`));
