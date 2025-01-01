import express from 'express'
import NewUser from '../models/newuser.js';

const router = express.Router();

router.post("/user-questionnaire/:userId", async (req, res) => {
    const { userId } = req.params;
    const { answers } = req.body;  // User's answers to the questionnaire

    if (!answers || answers.length === 0) {
        return res.status(400).json({ error: "Answers are required" });
    }

    try {
        // Derive categories from the user's answers
        const categories = [];
        if (answers.student) categories.push('student');
        if (answers.caste) categories.push(answers.caste);
        if (answers.minority) categories.push('minority');
        if (answers.ageGroup) categories.push(answers.ageGroup);

        const user = await NewUser.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user with their categories
        user.categories = categories;
        await user.save();

        res.status(200).json({ message: "User categories updated successfully", user });
    } catch (error) {
        console.error("Error updating user categories:", error);
        res.status(500).json({ error: "Failed to update user categories" });
    }
});

export default router;