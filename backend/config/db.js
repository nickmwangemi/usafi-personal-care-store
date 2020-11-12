import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})

		console.log(`\nMongoDB Connected: ${conn.connection.host} `.cyan.underline)
	} catch (error) {
		console.error(`\nError: ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}

export default connectDB
