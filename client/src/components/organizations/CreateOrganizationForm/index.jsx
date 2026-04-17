import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrganization } from "../../../services/organizationService";

function CreateOrganizationForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    industry: "",
    foundedYear: "",
    website: "",
    contactEmail: "",
    city: "",
    country: "",
    logoUrl: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name?.trim()) return;

    try {
      await createOrganization({
        name: form.name,
        description: form.description,
        industry: form.industry,
        foundedYear: form.foundedYear ? Number(form.foundedYear) : null,
        website: form.website,
        contactEmail: form.contactEmail,
        headquarters: {
          city: form.city,
          country: form.country,
        },
        logoUrl: form.logoUrl,
      });

      navigate("/organizations");
    } catch (err) {
      console.error(err);
    }
  };

  //  shared styles (single source of truth)
  const inputClass =
    "bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl text-sm text-white w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-400";

  const textareaClass =
    "bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl text-sm text-white w-full focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-slate-400 min-h-[100px] resize-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6"
    >
      {/* BASIC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Organization Name *"
          className={inputClass}
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <input
          placeholder="Industry"
          className={inputClass}
          value={form.industry}
          onChange={(e) => handleChange("industry", e.target.value)}
        />
      </div>

      <textarea
        placeholder="Description"
        className={textareaClass}
        value={form.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      {/* DETAILS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          placeholder="Founded Year"
          className={inputClass}
          value={form.foundedYear}
          onChange={(e) => handleChange("foundedYear", e.target.value)}
        />

        <input
          placeholder="Website"
          className={inputClass}
          value={form.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />

        <input
          placeholder="Email"
          className={inputClass}
          value={form.contactEmail}
          onChange={(e) => handleChange("contactEmail", e.target.value)}
        />
      </div>

      {/* LOCATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="City"
          className={inputClass}
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
        />

        <input
          placeholder="Country"
          className={inputClass}
          value={form.country}
          onChange={(e) => handleChange("country", e.target.value)}
        />
      </div>

      {/* MEDIA */}
      <input
        placeholder="Logo URL"
        className={inputClass}
        value={form.logoUrl}
        onChange={(e) => handleChange("logoUrl", e.target.value)}
      />

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white text-sm transition"
        >
          Create Organization
        </button>
      </div>
    </form>
  );
}

export default CreateOrganizationForm;