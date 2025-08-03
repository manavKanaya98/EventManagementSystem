const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
        // fields
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

    }, {
        timestamps: true
    });

UserSchema.methods.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
}

// Handles user registration & password encryption
UserSchema.statics.register = async function(createdUser) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(createdUser.password, salt);
        createdUser.password = hash;
        const savedUser = await createdUser.save();
        return savedUser;
    } catch (err) {
        console.error("Error registering user", err);
        throw err; 
    }
}

// Searches for a user by a provided email
UserSchema.statics.findUserByEmail = async function(email){
    const query = { email: email };
    try {
        const user = await User.findOne(query);
        return user;
    } catch (err) {
        console.error("Error finding user", err);
        throw err; 
    }
}

// Compares between user entered password and stored encrypted password
UserSchema.statics.comparePassword = async function (enteredPassword, hashedPassword) {
    const match = await bcrypt.compare(enteredPassword, hashedPassword);
    return match;
}

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);
module.exports = User;

