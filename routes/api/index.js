// Create an instance of an express router
const router = require('express').Router();

// Import the user and thoughts API routes
const usersRoutes = require('./users-routes');
const thoughtsRoutes = require('./thoughts-routes');

// Define middleware for using the users and thoughts API routes
router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRoutes);

// Export the router
module.exports = router;