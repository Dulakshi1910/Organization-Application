import mongoose from "mongoose";
import Company from "../models/company.js";
import Organization from "../models/organization.js";

// ── GET full dashboard data for an organization ───────────────
// Returns all stats, breakdowns and summaries needed by the frontend
export const getDashboard = async (req, res) => {
  try {
    const { orgId } = req.params;

    const org = await Organization.findById(orgId);
    if (!org) return res.status(404).json({ success: false, message: "Organization not found" });

    const [
      totalCompanies,
      activeCompanies,
      totalEmployees,
      healthAverages,
      architectureBreakdown,
      methodologyBreakdown,
      cloudBreakdown,
      lifecycleBreakdown,
      statusBreakdown,
      industryBreakdown,
      recentCompanies,
      topFrontendTech,
      topBackendTech,
    ] = await Promise.all([

      // 1. Total companies
      Company.countDocuments({ organization: orgId }),

      // 2. Active companies
      Company.countDocuments({ organization: orgId, status: "active" }),

      // 3. Total employees (sum)
      Company.aggregate([
        { $match: { organization: org._id } },
        { $group: { _id: null, total: { $sum: "$employees" } } },
      ]),

      // 4. Avg test coverage, tech debt, uptime
      Company.aggregate([
        { $match: { organization: org._id } },
        {
          $group: {
            _id: null,
            avgTestCoverage: { $avg: "$engineeringHealth.testCoverage" },
            avgTechDebt:     { $avg: "$engineeringHealth.techDebt" },
            avgUptime:       { $avg: "$engineeringHealth.uptime" },
          },
        },
      ]),

      // 5. Count by architecture
      Company.aggregate([
        { $match: { organization: org._id, architecture: { $ne: null } } },
        { $group: { _id: "$architecture", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // 6. Count by methodology
      Company.aggregate([
        { $match: { organization: org._id, methodology: { $ne: null } } },
        { $group: { _id: "$methodology", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // 7. Count by cloud provider
      Company.aggregate([
        { $match: { organization: org._id, "techStack.cloud": { $ne: null } } },
        { $group: { _id: "$techStack.cloud", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // 8. Count by lifecycle
      Company.aggregate([
        { $match: { organization: org._id, lifecycle: { $ne: null } } },
        { $group: { _id: "$lifecycle", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // 9. Count by status
      Company.aggregate([
        { $match: { organization: org._id } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),

      // 10. Count by industry
      Company.aggregate([
        { $match: { organization: org._id, industry: { $ne: null } } },
        { $group: { _id: "$industry", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),

      // 11. 5 most recently added companies (include fields frontend needs) + computed "score"
      Company.aggregate([
        { $match: { organization: org._id } },
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
        {
          $project: {
            name: 1,
            description: 1,
            industry: 1,
            status: 1,
            employees: 1,
            brandColor: 1,
            architecture: 1,
            methodology: 1,
            techStack: 1,
            frontend: 1,
            backend: 1,
            database: 1,
            devops: 1,
            engineeringHealth: 1,
            createdAt: 1,
            score: {
              $round: [
                {
                  $divide: [
                    {
                      $add: [
                        { $ifNull: ["$engineeringHealth.testCoverage", 0] },
                        { $ifNull: ["$engineeringHealth.uptime", 0] },
                        { $subtract: [100, { $ifNull: ["$engineeringHealth.techDebt", 0] }] },
                      ],
                    },
                    3,
                  ],
                },
                0,
              ],
            },
          },
        },
      ]),
      // 12. Most common frontend tech across all companies
      Company.aggregate([
        { $match: { organization: org._id, "techStack.frontend": { $exists: true } } },
        { $unwind: "$techStack.frontend" },
        { $group: { _id: "$techStack.frontend", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),

      // 13. Most common backend tech across all companies
      Company.aggregate([
        { $match: { organization: org._id, "techStack.backend": { $exists: true } } },
        { $unwind: "$techStack.backend" },
        { $group: { _id: "$techStack.backend", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    const health = healthAverages[0] || { avgTestCoverage: 0, avgTechDebt: 0, avgUptime: 0 };

    res.status(200).json({
      success: true,
      data: {
        organization: { id: org._id, name: org.name, slug: org.slug },
        summary: {
          totalCompanies,
          activeCompanies,
          inactiveCompanies: totalCompanies - activeCompanies,
          totalEmployees: totalEmployees[0]?.total || 0,
          avgTestCoverage: Math.round(health.avgTestCoverage),
          avgTechDebt:     Math.round(health.avgTechDebt),
          avgUptime:       parseFloat(health.avgUptime?.toFixed(2)) || 0,
        },
        breakdowns: {
          architecture:  architectureBreakdown.map((d) => ({ label: d._id, count: d.count })),
          methodology:   methodologyBreakdown.map((d)  => ({ label: d._id, count: d.count })),
          cloud:         cloudBreakdown.map((d)        => ({ label: d._id, count: d.count })),
          lifecycle:     lifecycleBreakdown.map((d)    => ({ label: d._id, count: d.count })),
          status:        statusBreakdown.map((d)        => ({ label: d._id, count: d.count })),
          industry:      industryBreakdown.map((d)      => ({ label: d._id, count: d.count })),
        },
        recentCompanies,
        topTechnologies: {
          frontend: (topFrontendTech || []).map((t) => ({ tech: t._id, usedBy: t.count })),
          backend:  (topBackendTech  || []).map((t) => ({ tech: t._id, usedBy: t.count })),
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ── GET per-company health comparison ─────────────────────────
export const getHealthReport = async (req, res) => {
  try {
    const orgId = mongoose.Types.ObjectId(req.params.orgId);

    const companies = await Company.aggregate([
      { $match: { organization: orgId } },
      {
        $project: {
          name: 1,
          engineeringHealth: 1,
          status: 1,
          industry: 1,
          employees: 1,
          score: {
            $round: [
              {
                $divide: [
                  {
                    $add: [
                      { $ifNull: ["$engineeringHealth.testCoverage", 0] },
                      { $ifNull: ["$engineeringHealth.uptime", 0] },
                      { $subtract: [100, { $ifNull: ["$engineeringHealth.techDebt", 0] }] },
                    ],
                  },
                  3,
                ],
              },
              0,
            ],
          },
        },
      },
      { $sort: { score: -1 } },
    ]);

    res.status(200).json({ success: true, data: companies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};