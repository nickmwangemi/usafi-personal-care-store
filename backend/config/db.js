import mongoose from 'mongoose';
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log(`\nMongoDB Connected: ${conn.connection.host} `.cyan.underline)
    } catch (error) {
        console.error(`\nError: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB