import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  alltasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  organization_code: Number,
});

export const Manager = mongoose.model("Manager", ManagerSchema);
