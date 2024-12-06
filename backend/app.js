/**
 * @pakages
**/
import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import cors from 'cors'

/**
 * @Configuratinos
**/
const app = express();
app.use(cors())

/**
 * @Routes
**/
app.get("/", (req, res) => {
    res.send("hello world")
})

export default app;