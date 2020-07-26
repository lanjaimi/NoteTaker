const express = require('express');
const app = express();
const helmet = require('helmet');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');
const validateRouter = require('./routes/validate');
const mongoose = require('mongoose');
const path = require('path');

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/note_taker';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', (_) => {
  console.log('Database connected:', url);
});

db.on('error', (err) => {
  console.error('connection error:', err);
});
app.use(helmet());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use('/notes', notesRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/validate', validateRouter);

app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
