import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    role: {
        type: String,
        enum: ["employee", "manager"],
        default : "manager",
        required: true
    }
})


export const User = mongoose.model("User",UserSchema)