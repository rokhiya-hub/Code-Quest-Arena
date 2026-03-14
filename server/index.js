const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
// const courseRoutes = require('./routes/course'); // add later if needed

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// serve static front-end files
app.use(express.static(path.join(__dirname, '..')));

// api routes
app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);

// catch-all that returns index.html (for SPA if you convert later)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// mongo connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Mongo connection error', err);
  });
