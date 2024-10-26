import mongoose from "mongoose";

const connectdb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("database connected sucessfully ✌🏻");
        })
    } catch (error) {
        console.log(error);
    }
}

export default connectdb