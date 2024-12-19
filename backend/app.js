/**
 * @pakages
**/
import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectdb from './db/db.js'
import userRoutes from './routes/user.routes.js'
/**
 * @Configuratinos
**/
connectdb()
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

/**
 * @Routes
**/
app.use('/users', userRoutes)

export default app;