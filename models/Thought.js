// Import the mongoose npm package
const { Schema, model, Types } = require('mongoose');

// Import the dateFormat function
const dateFormat = require('../utils/dateFormat');

// Createa the Reaction Schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            maxLength: 280,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// Create the Thought Schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            maxLength: 280,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // Prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// Define a mongoose virtual for counting a the number of reactions that a thought has
ThoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

// Define the Thought model
const Thought = model('Thought', ThoughtSchema);

// Export the Thought model
module.exports = Thought;