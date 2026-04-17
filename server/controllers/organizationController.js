import Organization from "../models/organization.js";
import Company from "../models/company.js";

// ── GET all organizations ─────────────────────────────────────
export const getAllOrgs = async (req, res) => {
  try {
    const orgs = await Organization.find({ isActive: true }).sort({ createdAt: -1 });

    // Attach company count to each org
    const orgsWithCount = await Promise.all(
      orgs.map(async (org) => {
        const count = await Company.countDocuments({ organization: org._id });
        return { ...org.toObject(), companyCount: count };
      })
    );

    res.status(200).json({ success: true, data: orgsWithCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET single organization (with companies) ──────────────────
export const getOrgById = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id).populate("companies");
    if (!org) return res.status(404).json({ success: false, message: "Organization not found" });

    res.status(200).json({ success: true, data: org });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── POST create organization ──────────────────────────────────
export const createOrg = async (req, res) => {
  try {
    const org = await Organization.create(req.body);
    res.status(201).json({ success: true, data: org });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "An organization with this name already exists" });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── PUT update organization ───────────────────────────────────
export const updateOrg = async (req, res) => {
  try {
    const org = await Organization.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!org) return res.status(404).json({ success: false, message: "Organization not found" });

    res.status(200).json({ success: true, data: org });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── DELETE organization ───────────────────────────────────────
export const deleteOrg = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id);
    if (!org) return res.status(404).json({ success: false, message: "Organization not found" });

    const companyCount = await Company.countDocuments({ organization: req.params.id });
    if (companyCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete — this org has ${companyCount} companies. Remove them first.`,
      });
    }

    await org.deleteOne();
    res.status(200).json({ success: true, message: "Organization deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};