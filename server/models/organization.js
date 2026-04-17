import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    foundedYear: {
      type: Number,
    },
    website: {
      type: String,
      trim: true,
    },
    logoUrl: {
      type: String,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    headquarters: {
      city: String,
      country: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: populate companies under this org
organizationSchema.virtual("companies", {
  ref: "Company",
  localField: "_id",
  foreignField: "organization",
});

// Auto-generate slug from name before saving
organizationSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-");
  }
  next();
});

export default mongoose.model("Organization", organizationSchema);