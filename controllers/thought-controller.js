// Import Thought and User models
const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts from the database
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
        });
    },
  
    // Get one thought from the database using the provided ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
        });
    },

    // Add a thought to a user in the database
    addThought({ params, body }, res) {
        console.log(params);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                console.log(dbUserData);
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // Update a thought in the database using the provided ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id }, 
            body, 
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // Remove a thought from the database using the provided ID
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                return res.status(404).json({ message: 'No user with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // Add a reaction to a thought in the database using the provided ID
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // Remove a reaction from a thought in the database using the provided ID
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

// Export the thoughtController object
module.exports = thoughtController;