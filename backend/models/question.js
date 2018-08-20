const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    name: {type: String, required: true},
    language: {type: String, required: true, enum: ['scheme', 'haskell', 'prolog', 'smalltalk']},
    description: {type: String, required:true},
    tests: {type: [String], required: true},
    solution: {type: String, required: true},
    output: {type: String, required: true}
  }
);

module.exports = mongoose.model('Question', QuestionSchema);