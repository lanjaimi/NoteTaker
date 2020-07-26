const express = require('express');
const router = express.Router();
const authMiddleware = require('../authMiddleware');
const User = require('../models/User');
const Note = require('../models/Note');

//get all notes
router.get('/', authMiddleware, async (req, res) => {
  try {
    //get latest notes from user by latest first
    const notes = await Note.find({ user: req.user.id }).sort({ _id: -1 });
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

//add a note
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newNote = new Note({
      user: req.user.id,
      title: req.body.title,
      content: req.body.content,
      date: req.body.date,
    });

    const note = await newNote.save();

    res.json(note);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

//delete a note
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // note doesn't exist

    if (!note) return res.send("note doesn't exist");

    //check user
    if (note.user.toString() !== req.user.id) {
      return res.send('User not authorized');
    }

    await note.remove();

    const notes = await Note.find({ user: req.user.id }).sort({ _id: -1 });
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

//update note
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // note doesn't exist

    if (!note) return res.send("note doesn't exist");

    //check user
    if (note.user.toString() !== req.user.id) {
      return res.send('User not authorized');
    }

    note.title = req.body.title;
    note.content = req.body.content;

    await note.save();

    const notes = await Note.find({ user: req.user.id }).sort({ _id: -1 });
    res.json(notes);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
