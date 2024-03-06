// Importing mongoose for defining the goals schema
const  mongoose = require('mongoose');

// Defining the goals schema using mongoose Schema
const goalsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    // Adding timestamps for createdAt and updatedAt
    timestamps: true
});

// Exporting the mongoose model for 'Goals' using the defined schema
module.exports = new mongoose.model('Goals', goalsSchema);