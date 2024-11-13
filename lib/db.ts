import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!)
        console.log('successfully connected 🎉');
        
    } catch (error:any) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
}  

export default connectDB