// Create an instance of an express router
const router = require('express').Router();

// Import user controller functions
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controller');

// /api/users route
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/users/<id> route
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api//users/<userId>/friends/<friendId> route
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .put(removeFriend);

// Export the router
module.exports = router;
