import express from "express";
import { castVote, getResults } from "../controllers/voteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/vote", protect, castVote);
router.get("/results/:id", protect, getResults);
router.post("/declare-results", protect, declareResults);


export default router;
