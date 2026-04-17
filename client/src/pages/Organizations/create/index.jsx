import CreateOrganizationForm from "../../../components/organizations/CreateOrganizationForm";

function CreateOrganizationPage() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-xl font-semibold text-white mb-6">
        Add Organization
      </h1>

      <CreateOrganizationForm />
    </div>
  );
}

export default CreateOrganizationPage;