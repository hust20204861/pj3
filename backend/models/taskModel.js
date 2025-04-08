const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  assignedTo: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
],
  status: {
    type: String,
    enum: ["TODO", "IN_PROGRESS", "DONE"],
    default: "TODO",
  },
  dueDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "LOW",
  },
  startAt: {
    type: Date
  },
  endAt: {
    type: Date
  },
  dependencies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    }
  ],
},
{
  timestamps: true,
}
);

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;