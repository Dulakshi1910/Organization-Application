import { useState } from "react";
import StepBasic from "../steps/StepBasic";
import StepTech from "../steps/StepTech";
import StepArchitecture from "../steps/StepArchitecture";
import StepTools from "../steps/StepTools";
import { createCompany } from "../../../services/companyService";

const steps = [
  { id: 1, title: "Basic" },
  { id: 2, title: "Tech" },
  { id: 3, title: "Architecture" },
  { id: 4, title: "Tools" },
];

function AddCompanyModal({ open, onClose, onSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    industry: "",
    org: "New Org",
    employees: "",
    founded: "",
    status: "active",
    tech: [],
    architecture: "",
    tools: {
      project: [],
      communication: [],
      ci: [],
      monitoring: [],
    },
  });

  if (!open) return null;

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!form.name) return;

    setLoading(true);

    const payload = {
      ...form,
      employees: Number(form.employees) || 0,
      tech: Array.isArray(form.tech) ? form.tech : [],
      founded: form.founded || "-",
      updated: "just now",
      score: 80,
    };

    const res = await createCompany(payload);

    setLoading(false);

    if (res?.success) {
      onSuccess?.(payload);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-5xl bg-[#0F172A] rounded-2xl border border-slate-800 flex overflow-hidden">

        {/* LEFT */}
        <div className="w-64 bg-slate-900 p-6 border-r border-slate-800">
          <h2 className="text-white text-lg font-semibold mb-6">
            Add Company
          </h2>

          <div className="flex flex-col gap-4">
            {steps.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                  ${
                    step === s.id
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {s.id}
                </div>

                <span
                  className={
                    step === s.id
                      ? "text-white text-sm"
                      : "text-slate-400 text-sm"
                  }
                >
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 p-8 flex flex-col justify-between">

          <div>
            {step === 1 && <StepBasic form={form} setForm={setForm} />}
            {step === 2 && <StepTech form={form} setForm={setForm} />}
            {step === 3 && <StepArchitecture form={form} setForm={setForm} />}
            {step === 4 && <StepTools form={form} setForm={setForm} />}
          </div>

          {/* FOOTER */}
          <div className="flex justify-between mt-8">
            <button
              onClick={back}
              disabled={step === 1}
              className="text-slate-400 text-sm disabled:opacity-40"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                onClick={next}
                className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-lg text-sm text-white transition"
              >
                Next 
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-lg text-sm text-white transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Company ✓"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCompanyModal;