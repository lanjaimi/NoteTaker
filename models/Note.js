const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = Note = mongoose.model('note', noteSchema);
