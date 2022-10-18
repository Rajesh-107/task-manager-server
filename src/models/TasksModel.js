const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    status: { type: String },
    email: { type: String },
    createdDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const TaskModel = mongoose.model("tasks", dataSchema);

module.exports = TaskModel;
