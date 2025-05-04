
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export const clientPromise = async()=>{

    try {
        await mongoose.connect(MONGODB_URI)
        .then(()=>console.log("db connected succesfully !"))
        
        
    } catch (error) {
        console.log(error);
        console.log("db not connected ! ")
        
    }
}

