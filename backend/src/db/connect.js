import mongoose from "mongoose";


const connect = async () => {
    try {
        console.log("Connecting to MongoDB..."); 
        await mongoose.connect(process.env.MONGO_URI, {dbName: process.env.MONGO_DB_NAME || "myDatabase"});
        console.log("Connected to MongoDB");
    } catch(error) {
        console.log("Failed to connect to MongoDB", error.message);
        process.exit(1);
       }    
    }
export default connect;