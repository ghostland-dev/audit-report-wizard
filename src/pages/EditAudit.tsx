
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AuditForm, { AuditData } from "@/components/AuditForm";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock audit data (same as in AuditDetails.tsx)
const mockAudit: AuditData = {
  id: 1,
  title: "Audit SI - Société ABC",
  client: "ABC Inc.",
  contactName: "Jean Dupont",
  contactEmail: "jean.dupont@abc-inc.com",
  sector: "Technologie",
  auditType: "Complet",
  employeeCount: "250-500",
  description: "Audit complet du système d'information avec focus sur la sécurité et l'infrastructure réseau.",
  createdAt: "2023-12-01T09:00:00",
  updatedAt: "2023-12-10T10:30:00",
  status: "completed",
  progress: 100,
  sections: [
    { id: "section1", title: "Introduction", progress: 100 },
    { id: "section2", title: "Présentation de l'entreprise", progress: 100 },
    { id: "section3", title: "État des lieux du SI", progress: 85 },
    { id: "section4", title: "Analyse des flux de données", progress: 75 },
    { id: "section5", title: "Exigences et contraintes", progress: 60 },
    { id: "section6", title: "Architecture cible", progress: 40 },
    { id: "section7", title: "Conclusion et recommandations", progress: 20 }
  ],
  findings: [
    { id: 1, title: "Obsolescence des serveurs", severity: "high", area: "Infrastructure", description: "Les serveurs principaux datent de plus de 7 ans et présentent des risques importants de pannes." },
    { id: 2, title: "Absence de politique de sécurité formalisée", severity: "medium", area: "Sécurité", description: "Aucune documentation sur les politiques de sécurité n'est disponible ou suivie." }
  ],
  recommendations: [
    { id: 1, title: "Renouvellement du parc serveurs", priority: "high", timeframe: "3 mois", description: "Remplacer les serveurs obsolètes par des équipements récents avec garantie constructeur." },
    { id: 2, title: "Création d'une PSSI", priority: "medium", timeframe: "6 mois", description: "Élaborer et documenter une Politique de Sécurité du Système d'Information complète." }
  ]
};

const EditAudit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [audit, setAudit] = useState<AuditData>(mockAudit);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch audit data
    const fetchAudit = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/audits/${id}`);
        // const data = await response.json();
        // setAudit(data);
        
        // Using mock data for now
        setAudit(mockAudit);
      } catch (error) {
        console.error("Error fetching audit:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de l'audit",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [id, toast]);

  const handleSaveAudit = (formData: any) => {
    // In a real app, this would be an API call to update the audit
    console.log("Saving audit with data:", formData);
    
    // Show success toast
    toast({
      title: "Audit mis à jour",
      description: "Les modifications ont été enregistrées avec succès",
    });
    
    // Navigate back to audit details page
    navigate(`/audits/${id}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-audit-blue-600 mx-auto"></div>
            <p className="mt-4 text-audit-blue-600">Chargement de l'audit...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/audits/${id}`)}
              className="mb-4 text-audit-blue-600 hover:text-audit-blue-700 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Retour aux détails de l'audit
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              Modifier l'audit: {audit.title}
            </h1>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <AuditForm 
              initialData={audit} 
              onSubmit={handleSaveAudit} 
              isEditing={true}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EditAudit;
