import express from "express";
import * as companyController from "../controllers/companyController.js";

const router = express.Router({ mergeParams: true }); // mergeParams gives access to :orgId

// /api/organizations/:orgId/companies
router.get("/",   companyController.getCompanies);
router.post("/",  companyController.createCompany);

// /api/organizations/:orgId/companies/:companyId
router.get("/:companyId",    companyController.getCompanyById);
router.put("/:companyId",    companyController.updateCompany);
router.delete("/:companyId", companyController.deleteCompany);

// /api/organizations/:orgId/companies/:companyId/health
router.patch("/:companyId/health", companyController.updateHealth);

export default router;