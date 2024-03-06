// Importing required packages and modules
require('dotenv').config();

const express = require('express');
const goalRoutes = require('./router/goalRoutes');
const mongoose = require('mongoose');

// Creating an Express application
const app = express();

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGODB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
// Connect to MongoDB
connectDB();

// Setting up the port
const PORT = process.env.PORT || 3000

app.use(express.json());

// Using goalRoutes for handling API routes
app.use('/api/goals', goalRoutes);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})