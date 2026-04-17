import Company from "../models/company.js";
import Organization from "../models/organization.js";

// ── GET all companies for an organization ─────────────────────
export const getCompanies = async (req, res) => {
  try {
    const { orgId } = req.params;

    // Optional query filters: ?status=active&architecture=Microservices&cloud=AWS
    const filter = { organization: orgId };
    if (req.query.status)       filter.status = req.query.status;
    if (req.query.architecture) filter.architecture = req.query.architecture;
    if (req.query.methodology)  filter.methodology = req.query.methodology;
    if (req.query.cloud)        filter["techStack.cloud"] = req.query.cloud;

    // Optional search by name
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: "i" };
    }

    const companies = await Company.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: companies.length, data: companies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET single company ────────────────────────────────────────
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findOne({
      _id: req.params.companyId,
      organization: req.params.orgId,
    }).populate("organization", "name slug");

    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── POST create company under an org ─────────────────────────
export const createCompany = async (req, res) => {
  try {
    const org = await Organization.findById(req.params.orgId);
    if (!org) return res.status(404).json({ success: false, message: "Organization not found" });

    const company = await Company.create({
      ...req.body,
      organization: req.params.orgId,
    });

    res.status(201).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── PUT update company ────────────────────────────────────────
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { _id: req.params.companyId, organization: req.params.orgId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── DELETE company ────────────────────────────────────────────
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({
      _id: req.params.companyId,
      organization: req.params.orgId,
    });

    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    res.status(200).json({ success: true, message: "Company deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── PATCH update engineering health only ─────────────────────
export const updateHealth = async (req, res) => {
  try {
    const { testCoverage, techDebt, uptime } = req.body;
    const company = await Company.findOneAndUpdate(
      { _id: req.params.companyId, organization: req.params.orgId },
      { engineeringHealth: { testCoverage, techDebt, uptime } },
      { new: true, runValidators: true }
    );

    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    res.status(200).json({ success: true, data: company.engineeringHealth });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ── GET company by id (global, not requiring org param) ──────
export const getCompanyGlobal = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId).populate(
      "organization",
      "name slug"
    );

    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};