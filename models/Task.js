import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        required : true
    },
    skillMatch : {
        type : String,
        required : true
    },
    deadline : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : [],
        required : true
    },
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    }
})

export const Task = mongoose.model("Task",TaskSchema)