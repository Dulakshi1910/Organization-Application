import Company from "../models/company.js";

// Aggregate top technologies across companies. Optional ?orgId= to scope to an organization
export const getTechnologies = async (req, res) => {
	try {
		const { orgId } = req.query;

		// helper to aggregate a tech array field
		const aggregateArrayField = async (fieldPath) => {
			const pipeline = [];
			if (orgId) pipeline.push({ $match: { organization: orgId } });
			pipeline.push({ $match: { [fieldPath]: { $exists: true } } });
			pipeline.push({ $unwind: `$${fieldPath}` });
			pipeline.push({ $group: { _id: `$${fieldPath}`, count: { $sum: 1 } } });
			pipeline.push({ $sort: { count: -1 } });
			const agg = await Company.aggregate(pipeline);
			return agg;
		};

		const matchBase = orgId ? { organization: orgId } : {};

		const frontend = await aggregateArrayField("techStack.frontend");
		const backend = await aggregateArrayField("techStack.backend");
		const database = await aggregateArrayField("techStack.database");
		const devops = await aggregateArrayField("techStack.devops");

		// cloud is a single-value field
		const cloudPipeline = [];
		if (orgId) cloudPipeline.push({ $match: { organization: orgId } });
		cloudPipeline.push({ $match: { "techStack.cloud": { $exists: true, $ne: null } } });
		cloudPipeline.push({ $group: { _id: "$techStack.cloud", count: { $sum: 1 } } });
		cloudPipeline.push({ $sort: { count: -1 } });
		const cloudAgg = await Company.aggregate(cloudPipeline);

		const normalize = (arr, category) =>
			(arr || []).map((a) => ({ id: a._id?.toString() || a._id, name: a._id, category, companies: a.count }));

		let items = [];
		items = items.concat(normalize(frontend, "Frontend"));
		items = items.concat(normalize(backend, "Backend"));
		items = items.concat(normalize(database, "Database"));
		items = items.concat(normalize(devops, "DevOps"));
		items = items.concat(normalize(cloudAgg, "Cloud"));

		// assign simple status based on counts (configurable thresholds could be added later)
		items = items.map((it) => {
			const companies = it.companies || 0;
			let status = "emerging";
			if (companies >= 50) status = "hot";
			else if (companies >= 10) status = "stable";
			return { ...it, status };
		});

		res.status(200).json({ success: true, data: items });
	} catch (err) {
		res.status(500).json({ success: false, message: err.message });
	}
};

export default { getTechnologies };
