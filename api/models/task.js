const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const conn = mongoose.connection;

const { TASK_REF, USER_REF } = require("./constants");

const taskSchema = new Schema({
  title: String,
  start: Date,
  end: Date,
  loc: {
    type: { type: String, enum: "Point", default: "Point" },
    coordinates: { type: [Number], default: [0, 0] }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER_REF
  }
});

taskSchema.index({ loc: "2dsphere" });

const taskClass = conn.model(TASK_REF, taskSchema);

module.exports = taskClass;
