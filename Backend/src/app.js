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
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl/postman)
        if (!origin) return callback(null, true);
        
        // Dynamically allow any localhost port or matching FRONTEND_URL
        const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin);
        if (isLocalhost || origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
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