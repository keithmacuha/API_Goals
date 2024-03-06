const Goals = require('../model/goalModel');
const  mongoose = require('mongoose');

// Create new goals
const createGoals = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

         // Create new goals using the Goals model
        const goals = await Goals.create({
            title: title,
            description: description,
            completed: completed
        });

        if (goals) {
             // Respond with the created goals
            return res.status(201).json({
                id: goals._id,
                title: goals.title,
                description: goals.description,
                completed: goals.completed
            })
        } else {
            // Respond with an error if goals creation fails
            return res.status(409).json({ error: 'Invalid goals data' });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        })
    }
};

// Get all goals
const getAllGoals = async (req, res) => {
    try {
        // Find all goals, excluding unnecessary fields, and sort by creation date
        const goals = await Goals.find({}).select('-createdAt -updatedAt -__v').sort({ createdAt: -1 });

        // Respond with the list of goals
        return res.status(200).json(goals);
    } catch (error) {
          // Handle any errors that occur during the process
        res.status(500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

// Get a specific set of goals by ID
const getGoals = async (req, res) => {
    try {
        const { id } = req.params;

         // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid goals ID' });
        }

         // Find and return the goals with the specified ID
        const goals = await Goals.findOne({ _id: id }).select('-createdAt -updatedAt -__v');
        ;

        if (!goals) {
            // Respond with an error if no goals are found with the specified ID
            return res.status(400).json({ error: 'No such goals exists' });
        }
        
        return res.status(200).json( goals );

    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

// Update goals by ID
const updateGoals = async (req, res) => {
    try {
        const { id } = req.params;

         // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid goals ID' });
        }

        const { title, description, completed } = req.body;

        // Check for empty request body
        if (!title && !description && completed === undefined) {
            return res.status(400).json({ error: 'Empty update request' });
        }

          // Update and return the modified goals
        const updatedGoals = await Goals.findOneAndUpdate(
            { _id: id },
            {...req.body},
            {new: true}
        ).select('-createdAt -updateAt -__v');

        if (!updatedGoals) {
            // Respond with an error if no goals are found with the specified ID
            return res.status(400).json({ error: 'No such goals exists' });
        }

        return res.status(200).json(updatedGoals);

    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

// Delete goals by ID
const deleteGoals = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid goals ID' });
        }

        // Find and delete goals with the specified ID
        const deletedGoals = await Goals.findOneAndDelete({ _id: id });

        if (!deletedGoals) {
            // Respond with an error if no goals are found with the specified ID
            return res.status(400).json({ error: 'No such goals exists' });
        }
        
        // Respond with a success message after deleting goals
        return res.status(200).json({ message: 'Goals deleted successfully' });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        })
    }
};

module.exports = { createGoals, getGoals, getAllGoals, updateGoals, deleteGoals  };