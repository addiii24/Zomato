import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/auth.routes.js';
import foodrouter from './routes/food.routes.js';


const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/auth", router);
app.use("/api/food", foodrouter);

export default app;