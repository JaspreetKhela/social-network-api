// Import the mongoose npm package
const { Schema, model } = require('mongoose');

// Import 

// Import the dateFormat function
const dateFormat = require('../utils/dateFormat');

// Define the User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: [true, 'Please enter Email Address'],
        unique: true
        // validate: {
        //     validator: () => Promise.resolve(false),
        //     message: 'Email validation failed'
        // }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thought"
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
    }
);

// Define a mongoose virtual for counting a the number of friends that a user has
UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

// Define the User model
const User = model('User', UserSchema);

// Export the User model
module.exports = User;