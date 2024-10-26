import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    department : {
        type : String,
        required : true
    },
    designation : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    joiningDate : {
        type : Date,
        required : true
    },
    skills : {
        type : [String]
    },
    performanceHistory : {
        type : [
            {month :String,performance: Number }
        ]
    },
    tasks : {
        type : [
            {type : mongoose.Schema.Types.ObjectId,ref:"Task"}
        ]
    }
})

export const Employee = mongoose.model("Employee",EmployeeSchema)