import express from "express";
import * as companyController from "../controllers/companyController.js";

const router = express.Router();

// /api/companies/:companyId
router.get("/:companyId", companyController.getCompanyGlobal);

export default router;
