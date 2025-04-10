
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import AuditForm, { AuditData } from "@/components/AuditForm";
import ReportPreview from "@/components/ReportPreview";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreateAuditPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<AuditData>>({});
  const [activeTab, setActiveTab] = useState<string>("edit");

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

  const handleSaveDraft = async () => {
    if (!formData.title || !formData.client) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez ajouter au moins un titre et un client pour enregistrer un brouillon.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call to save draft
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Brouillon enregistré",
        description: "Votre brouillon a été enregistré avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur lors de l'enregistrement",
        description: "Une erreur est survenue lors de l'enregistrement du brouillon.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (data: Partial<AuditData>) => {
    setFormData(data);
  };

  const togglePreview = () => {
    setActiveTab(activeTab === "edit" ? "preview" : "edit");
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSubmitting || (!formData.title && !formData.client)}
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer le brouillon
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Nouvel audit</CardTitle>
            <CardDescription>
              Complétez le formulaire ci-dessous pour créer un nouvel audit. Vous pouvez prévisualiser le rapport à tout moment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="edit">Éditer</TabsTrigger>
                <TabsTrigger value="preview">Prévisualiser</TabsTrigger>
              </TabsList>
              <TabsContent value="edit" className="mt-0">
                <AuditForm 
                  onSubmit={handleSubmit} 
                  isEditing={false}
                  onChange={handleFormChange}
                />
              </TabsContent>
              <TabsContent value="preview" className="mt-0">
                <div className="flex justify-center">
                  <div className="w-full max-w-4xl">
                    <ReportPreview 
                      auditData={formData} 
                      loading={isSubmitting}
                    />
                    <div className="mt-6 flex justify-center">
                      <Button 
                        onClick={() => setActiveTab("edit")}
                        variant="outline"
                      >
                        Retourner à l'édition
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateAuditPage;
