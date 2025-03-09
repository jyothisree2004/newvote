import express from "express";
import Nomination from "../models/Nomination.js";

const router = express.Router();

// ✅ GET: Fetch all approved candidates for voting
router.get("/candidates", async (req, res) => {
  try {
    const candidates = await Nomination.find({ nominationStatus: "Approved" }).populate("candidate", "name email"); // Fetch candidate details
    res.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ message: "Error fetching candidates" });
  }
});

// ✅ POST: Cast a vote
router.post("/vote", async (req, res) => {
  const { candidateId, studentId } = req.body;

  try {
    // Check if the student has already voted
    const existingVote = await Nomination.findOne({ voters: studentId });

    if (existingVote) {
      return res.status(400).json({ message: "You have already voted!" });
    }

    // Find the candidate and update votes
    const candidate = await Nomination.findById(candidateId);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    candidate.votes = (candidate.votes || 0) + 1;
    candidate.voters = candidate.voters || [];
    candidate.voters.push(studentId); // Store voter ID to prevent duplicate votes
    await candidate.save();

    res.json({ message: "Vote cast successfully!" });
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ message: "Error casting vote" });
  }
});
//display result
router.get("/results", async (req, res) => {
    try {
      const results = await Nomination.find({ nominationStatus: "Approved" })
        .sort({ votes: -1 }) // Sort by votes (highest first)
        .populate("candidate", "name email");
  
      res.json(results);
    } catch (error) {
      console.error("Error fetching election results:", error);
      res.status(500).json({ message: "Error fetching election results" });
    }
  });
  

export default router;
