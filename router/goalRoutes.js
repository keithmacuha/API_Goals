// Importing Express Router
const router = require('express').Router();

// Importing goalControllers for handling routes
const { createGoals, getAllGoals, getGoals, deleteGoals, updateGoals } = require('../controllers/goalControllers');

// API routes for creating, retrieving, updating, and deleting goals
router.post('/create', createGoals);
router.get('/all', getAllGoals);
router.get('/:id', getGoals);
router.route('/fetch/:id').delete(deleteGoals).put(updateGoals);

module.exports = router;