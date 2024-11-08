import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import { config } from 'dotenv';

import {router as authRoute} from "./routes/auth.js";
import {router as tasksRoute} from "./routes/tasks.js";

config({path: '../.env'});
const PORT = process.env.PORT || 6969;
const app = express();

app.listen(PORT, (err)=>{
    if (err) {console.log(err)};
    console.log(`App running on port ${PORT}`);
})

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use('/auth', authRoute);
app.use('/tasks', tasksRoute);