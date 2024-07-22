import  mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODB_URI;
const connect =async()=>{
    const connectionState=mongoose.connection.readyState;
if(connectionState===1){
    console.log("Already connected");
    return;
}
if(connectionState===2){
    console.log("connecting...");
    return;
}
try {
    await mongoose.connect(MONGODB_URI!, {
        dbName: 'agrogenapi',
        bufferCommands: true,
       
    
    });
    console.log('Connected to MongoDB');
} catch (err:any) {
    console.error('Error connecting to MongoDB: ', err);
    throw new Error(`Error connecting to MongoDB: ${err.message}`);
}
};

export default connect;