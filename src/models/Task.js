import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true, minlength: 6, maxlength: 150 },
  description: { type: String, maxlength: 150 },
  project: { type: Schema.Types.ObjectId, ref: 'project', required: true }
}, {
  timestamps: true,
});

const Task = model('task', taskSchema);

export default Task;
