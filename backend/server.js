import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import connectDB from './config/db.js'
dotenv.config()
const app = express()
// for rendering json request(data)
app.use(express.json())
// for form data
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const port = process.env.NODE_PORT || 3000
// fro cookie get token for cookie 
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// @routes
app.use('/api/user', userRoutes)

// @adding middlewares
app.use(notFound);
app.use(errorHandler)
// connection  to mongoDB
connectDB()

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})