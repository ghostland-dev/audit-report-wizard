
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import AuditForm, { AuditData } from "@/components/AuditForm";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [audit, setAudit] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<string | null>(null);

  useEffect(() => {
    // Add confirmation before leaving page if there are unsaved changes
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = ""; // Required for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  useEffect(() => {
    // Simulate API call to fetch audit data
    const fetchAudit = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/audits/${id}`);
        // if (!response.ok) throw new Error(`Erreur ${response.status}: Impossible de récupérer l'audit`);
        // const data = await response.json();
        // setAudit(data);
        
        // Using mock data for now
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!id || isNaN(Number(id))) {
          throw new Error("ID d'audit invalide");
        }
        
        setAudit({...mockAudit, id: Number(id)});
      } catch (error) {
        console.error("Error fetching audit:", error);
        if (error instanceof Error) {
          setError(error.message || "Impossible de charger les données de l'audit. Veuillez réessayer.");
        } else {
          setError("Impossible de charger les données de l'audit. Veuillez réessayer.");
        }
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

  const handleFormChange = () => {
    setHasChanges(true);
  };

  const handleSaveAudit = async (formData: AuditData) => {
    setSaving(true);
    try {
      // In a real app, this would be an API call to update the audit
      // const response = await fetch(`/api/audits/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // if (!response.ok) throw new Error(`Erreur ${response.status}: Impossible de mettre à jour l'audit`);
      
      // Simulate network delay and validation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate validation error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Erreur de validation lors de la sauvegarde des données");
      }
      
      console.log("Saving audit with data:", formData);
      
      // Update the audit data with the updated timestamp
      const updatedAudit = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      
      setAudit(updatedAudit);
      setHasChanges(false);
      
      // Show success toast
      toast({
        title: "Audit mis à jour",
        description: "Les modifications ont été enregistrées avec succès",
      });
      
      // Navigate back to audit details page
      navigate(`/audits/${id}`);
    } catch (error) {
      console.error("Error saving audit:", error);
      if (error instanceof Error) {
        toast({
          title: "Erreur",
          description: error.message || "Impossible d'enregistrer les modifications. Veuillez réessayer.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible d'enregistrer les modifications. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancelNavigation = () => {
    setShowConfirmDialog(false);
    setNavigationTarget(null);
  };

  const handleConfirmNavigation = () => {
    setShowConfirmDialog(false);
    if (navigationTarget) {
      navigate(navigationTarget);
    }
  };

  const handleNavigation = (path: string) => {
    if (hasChanges) {
      setNavigationTarget(path);
      setShowConfirmDialog(true);
    } else {
      navigate(path);
    }
  };

  // Loading skeleton UI
  if (loading) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="h-12 w-3/4 my-2" />
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Skeleton className="h-14 w-full my-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                  <Skeleton className="h-14 w-full" />
                </div>
                <Skeleton className="h-28 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4 text-audit-blue-600 hover:text-audit-blue-700 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Retour au tableau de bord
          </Button>
          
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>{error}</p>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={() => window.location.reload()}
              >
                Réessayer
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  if (!audit) {
    return (
      <Layout>
        <div className="p-6 space-y-6">
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              Aucune donnée d'audit n'a été trouvée
              <Button 
                variant="outline" 
                className="mt-2 mr-2" 
                onClick={() => navigate('/dashboard')}
              >
                Retour au tableau de bord
              </Button>
              <Button 
                variant="outline" 
                className="mt-2" 
                onClick={() => window.location.reload()}
              >
                Réessayer
              </Button>
            </AlertDescription>
          </Alert>
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
              onClick={() => handleNavigation(`/audits/${id}`)}
              className="mb-4 text-audit-blue-600 hover:text-audit-blue-700 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Retour aux détails de l'audit
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">
              Modifier l'audit: {audit.title}
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handleNavigation(`/audits/${id}`)}
              disabled={saving}
            >
              Annuler
            </Button>
            {hasChanges && (
              <div className="text-xs text-amber-600 italic mt-2">
                * Des modifications non enregistrées
              </div>
            )}
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <AuditForm 
              initialData={audit} 
              onSubmit={handleSaveAudit}
              isEditing={true}
              onChange={handleFormChange}
            />
          </CardContent>
        </Card>

        {/* Confirmation Dialog for Unsaved Changes */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Modifications non enregistrées</AlertDialogTitle>
              <AlertDialogDescription>
                Vous avez des modifications non enregistrées. Êtes-vous sûr de vouloir quitter cette page? Les modifications seront perdues.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelNavigation}>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmNavigation}>Continuer</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default EditAudit;
