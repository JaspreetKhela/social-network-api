// Create an instance of an express router
const router = require('express').Router();

// Import the API routes
const apiRoutes = require('./api');

// Import the HTML routes
// const htmlRoutes = require('./html/html-routes');

// Define middleware for using the API and HTML routes
router.use('/api', apiRoutes);
// router.use('/', htmlRoutes);

// Define middleware for reponding with a user-input error if the user attempts to navigate to a non-existent route
router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

// Export the router
module.exports = router;