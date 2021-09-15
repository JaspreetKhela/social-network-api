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
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts route
router
    .route('/')
    .get(getAllThought);

// /api/thoughts/<userId> router
router.route('/:userId')
    .get(getThoughtById)
    .post(addThought)
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/<thoughtId>
router
  .route('/:thoughtId/reactions/:reactionId')
  .post(addReaction)
  .delete(removeReaction);

// Export router
module.exports = router;