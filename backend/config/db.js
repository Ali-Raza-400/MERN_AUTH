import mongoose from "mongoose";

const connectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb connection Successful ${conn.connection.host} `);
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB