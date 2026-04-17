import express from "express";
import * as orgController from "../controllers/organizationController.js";

const router = express.Router();

// /api/organizations
router.get("/",    orgController.getAllOrgs);
router.post("/",   orgController.createOrg);

// /api/organizations/:id
router.get("/:id",    orgController.getOrgById);
router.put("/:id",    orgController.updateOrg);
router.delete("/:id", orgController.deleteOrg);

export default router;