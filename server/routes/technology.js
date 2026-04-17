import express from "express";
import * as techController from "../controllers/technologyController.js";

const router = express.Router();

// /api/technologies
router.get("/", techController.getTechnologies);

export default router;
