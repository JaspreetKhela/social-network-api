// Create an instance of an express router
const router = require('express').Router();

// Import thought controller functions
const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts route
router
    .route('/')
    .get(getAllThought)

// /api/thoughts/<userId> route
router
    .route('/:userId')
    .post(addThought);

// /api/thoughts/<thoughtId> router
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)

// /api/thoughts/<thoughtId>/users/<userId>/ route
router
    .route('/:thoughtId/users/:userId/')
    .put(addReaction)
    .delete(removeThought);

// /api/thoughts/<thoughtId>/users/<userId>/reactions/<reactionId> route
router
    .route('/:thoughtId/users/:userId/reactions/:reactionId')
    .put(removeReaction);

// Export router
module.exports = router;