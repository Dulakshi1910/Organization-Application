import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../../components/layout/Sidebar";
import Header from "../../../components/layout/Header";
import PageContainer from "../../../components/layout/PageContainer";

import StepBasic from "../../../components/companies/steps/StepBasic";
import StepTech from "../../../components/companies/steps/StepTech";
import StepArchitecture from "../../../components/companies/steps/StepArchitecture";
import StepTools from "../../../components/companies/steps/StepTools";

import { createCompany } from "../../../services/companyService";

const steps = [
  { id: 1, title: "Basic" },
  { id: 2, title: "Tech" },
  { id: 3, title: "Architecture" },
  { id: 4, title: "Tools" },
];

function CreateCompany() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    industry: "",
    org: "",
    employees: "",
    founded: "",
    status: "active",
    tech: { frontend: [], backend: [], database: [], devops: [], cloud: "" },
    architecture: "",
    tools: { projectManagement: "", communication: "", cicd: "", monitoring: "" },
  });

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
  if (!form.name) return;

  setLoading(true);

  // Build payload aligned with backend Company model
  const payload = {
    name: form.name,
    industry: form.industry,
    description: form.description,
    foundedYear: Number(form.founded) || undefined,
    employees: Number(form.employees) || 0,
    status: form.status === 'review' ? 'stealth' : form.status,
    brandColor: form.brandColor || undefined,
    // techStack expects arrays per category
    techStack: {
      frontend: form.tech?.frontend || [],
      backend: form.tech?.backend || [],
      database: form.tech?.database || [],
      devops: form.tech?.devops || [],
      cloud: form.tech?.cloud || undefined,
    },
    architecture: form.architecture || undefined,
    methodology: form.methodology || undefined,
    lifecycle: form.lifecycle || undefined,
    engineeringHealth: {
      testCoverage: Number(form.testCoverage) || 0,
      techDebt: Number(form.techDebt) || 0,
      uptime: Number(form.uptime) || 99,
    },
    // Map tools: backend expects single strings; pick primary selection
    tools: {
      projectManagement: form.tools?.projectManagement || undefined,
      communication: form.tools?.communication || undefined,
      cicd: form.tools?.cicd || undefined,
      monitoring: form.tools?.monitoring || undefined,
    },
    notes: form.notes || undefined,
    tags: form.tags || [],
    score: form.score || 80,
  };

  const res = await createCompany(form.org, payload);

  setLoading(false);

  if (res?.success) {
    navigate("/companies");
  }
};

  return (
    <PageContainer>
      <Sidebar />

      <div className="flex-1 px-6 md:px-8 py-6 bg-slate-950 min-h-screen">
        <Header />

        <div className="mb-6">
          <h1 className="text-white text-xl font-semibold">
            Add new company
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Step {step} of 4
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex lg:flex-col gap-4 overflow-x-auto">
              {steps.map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs
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

          <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              {step === 1 && <StepBasic form={form} setForm={setForm} />}
              {step === 2 && <StepTech form={form} setForm={setForm} />}
              {step === 3 && <StepArchitecture form={form} setForm={setForm} />}
              {step === 4 && <StepTools form={form} setForm={setForm} />}
            </div>

            <div className="flex justify-between mt-10">
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
                  className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2 rounded-lg text-sm text-white"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg text-sm text-white disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Company ✓"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default CreateCompany;