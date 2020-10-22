import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'

/**
 * Read environment variables
 */
dotenv.config()

/**
 * Initialize DB connection
 */
connectDB()

const app = express()

app.get('/', (req, res) => {
	res.send('API is running...')
})

app.use('/api/v1/products', productRoutes)

const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(
		`\nServer running in ${process.env.NODE_ENV} mode at http://127.0.0.1:${PORT}`
			.yellow.bold
	)
)
