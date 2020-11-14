import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

/**
 * Read environment variables
 */
dotenv.config()

/**
 * Initialize DB connection
 */
connectDB()

const app = express()

app.use(express.json())

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/users', userRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is running....')
	})
}

// Handles invalid routes
app.use(notFound)

// Handles errors in request
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`\nServer running in ${process.env.NODE_ENV} mode at http://127.0.0.1:${PORT}`
			.yellow.bold
	)
)
