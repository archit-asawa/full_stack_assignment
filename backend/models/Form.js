const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, enum: ['text', 'multiple-choice'], required: true },
  options: [String], // For multiple-choice
});

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [QuestionSchema],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publicId: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);
