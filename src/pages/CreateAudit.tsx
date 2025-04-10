
import Layout from "@/components/Layout";
import AuditForm from "@/components/AuditForm";
import ReportPreview from "@/components/ReportPreview";

const CreateAuditPage = () => {
  return (
    <Layout>
      <div className="audit-container py-8">
        <h1 className="text-2xl font-bold mb-6">Créer un nouvel audit</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AuditForm />
          </div>
          <div className="lg:col-span-1">
            <ReportPreview />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAuditPage;
