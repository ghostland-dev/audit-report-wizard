
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AuditForm, { AuditData } from "@/components/AuditForm";
import ReportPreview from "@/components/ReportPreview";
import { useToast } from "@/hooks/use-toast";

const CreateAuditPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<AuditData>>({});

  const handleSubmit = async (data: AuditData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call to create a new audit
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock ID for demonstration
      const newAuditId = Math.floor(Math.random() * 1000) + 1;
      
      toast({
        title: "Audit créé avec succès",
        description: "Votre nouvel audit a été créé et enregistré.",
      });
      
      // Navigate to the new audit's details page
      navigate(`/audits/${newAuditId}`);
    } catch (error) {
      toast({
        title: "Erreur lors de la création",
        description: "Une erreur est survenue lors de la création de l'audit. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (data: Partial<AuditData>) => {
    setFormData(data);
  };

  return (
    <Layout>
      <div className="audit-container py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Button>
            <h1 className="text-2xl font-bold">Créer un nouvel audit</h1>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AuditForm 
              onSubmit={handleSubmit} 
              isEditing={false}
              onChange={handleFormChange}
            />
          </div>
          <div className="lg:col-span-1">
            <ReportPreview 
              auditData={formData} 
              loading={isSubmitting}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAuditPage;
