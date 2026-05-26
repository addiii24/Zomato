import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/auth.routes.js';
import foodrouter from './routes/food.routes.js';
import likeRouter from './routes/like.routes.js';
import commentRouter from './routes/comment.routes.js';
import cors from "cors";


const app = express();
app.set('trust proxy', 1);

app.use(cors({
    origin:true,
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/auth", router);
app.use("/api/food", foodrouter);
app.use("/api/likes", likeRouter);
app.use("/api/comments", commentRouter);

export default app;
