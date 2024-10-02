const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  tittle: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  }, userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
