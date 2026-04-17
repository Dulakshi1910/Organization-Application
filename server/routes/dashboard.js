import express from "express";
import * as dashboardController from "../controllers/dashboardController.js";

const router = express.Router({ mergeParams: true });

// /api/organizations/:orgId/dashboard
router.get("/",       dashboardController.getDashboard);
router.get("/health", dashboardController.getHealthReport);

export default router;