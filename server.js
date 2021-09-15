// Import the express npm package
const express = require('express');

// Import the mongoose npm package
const mongoose = require('mongoose');

// Create an instance of am express app
const app = express();

// Define the port
const PORT = process.env.PORT || 3001;

// Define middleware for express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// Define middleware to import the API routes
app.use(require('./routes'));

// Start the server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));