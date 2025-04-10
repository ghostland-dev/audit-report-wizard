
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import AuditForm, { AuditData } from "@/components/AuditForm";
import { useToast } from "@/hooks/use-toast";

const EditAuditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [audit, setAudit] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [navDestination, setNavDestination] = useState<string | null>(null);
  const originalAuditRef = useRef<AuditData | null>(null);

  // Load audit data
  useEffect(() => {
    const fetchAudit = async () => {
      setLoading(true);
      try {
        // Simulating API call to fetch audit details
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockAudit: AuditData = {
          id: parseInt(id || "1"),
          title: "Audit de sécurité - Société ABC",
          client: "Société ABC",
          clientContact: "Jean Dupont",
          clientEmail: "jean.dupont@example.com",
          startDate: "2023-05-10",
          endDate: "2023-05-20",
          scope: "Évaluation complète de l'infrastructure réseau et des applications web. Teste de pénétration et analyse des vulnérabilités selon les standards OWASP.",
          methodology: "Nous avons utilisé une combinaison d'outils automatisés et de tests manuels pour identifier les vulnérabilités potentielles. Les tests ont été effectués à la fois en interne et à distance pour simuler différents types d'attaques.",
          findings: "Plusieurs vulnérabilités critiques ont été identifiées, notamment des failles XSS dans l'application de gestion client et des configurations de pare-feu obsolètes. Des problèmes de mise à jour de logiciels ont également été détectés sur plusieurs serveurs.",
          recommendations: "Mettre à jour immédiatement les configurations de pare-feu et appliquer les correctifs de sécurité disponibles. Implémenter une validation d'entrée stricte pour prévenir les attaques XSS. Établir un programme régulier de mise à jour pour tous les serveurs et applications.",
          status: "completed",
          progress: 100
        };
        
        setAudit(mockAudit);
        originalAuditRef.current = JSON.parse(JSON.stringify(mockAudit));
        setError(null);
      } catch (err) {
        setError("Impossible de charger les détails de l'audit. Veuillez réessayer plus tard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [id]);

  // Intercept navigation to show unsaved changes dialog if needed
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasChanges]);

  const handleFormChange = (changedData: Partial<AuditData>) => {
    if (!originalAuditRef.current) return;
    
    // Check if there are any differences from the original data
    const hasAnyChanges = Object.keys(changedData).some(key => {
      const k = key as keyof AuditData;
      return changedData[k] !== originalAuditRef.current?.[k];
    });
    
    setHasChanges(hasAnyChanges);
  };

  const handleNavigate = (destination: string) => {
    if (hasChanges) {
      setNavDestination(destination);
      setShowUnsavedDialog(true);
    } else {
      navigate(destination);
    }
  };

  const handleConfirmNavigation = () => {
    setShowUnsavedDialog(false);
    if (navDestination) {
      navigate(navDestination);
    }
  };

  const handleSubmit = async (data: AuditData) => {
    setSaving(true);
    try {
      // Simulate API call to update audit
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update the reference to the original data after successful save
      originalAuditRef.current = JSON.parse(JSON.stringify(data));
      setHasChanges(false);
      
      toast({
        title: "Modifications enregistrées",
        description: "Les modifications de l'audit ont été enregistrées avec succès.",
      });
      
      navigate(`/audits/${id}`);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer les modifications. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="audit-container py-8">
          <div className="mb-6 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(`/audits/${id}`)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="w-full h-[600px] rounded-lg" />
        </div>
      </Layout>
    );
  }

  if (error || !audit) {
    return (
      <Layout>
        <div className="audit-container py-8">
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              {error || "Audit non trouvé. Impossible de charger les données pour modification."}
            </AlertDescription>
          </Alert>
          <div className="flex justify-start">
            <Button 
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au tableau de bord
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="audit-container py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleNavigate(`/audits/${id}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux détails
            </Button>
            <h1 className="text-2xl font-bold">Modifier l'audit</h1>
          </div>
          
          {hasChanges && (
            <div className="text-sm text-muted-foreground">
              Modifications non enregistrées
            </div>
          )}
        </div>

        <AuditForm 
          initialData={audit} 
          onSubmit={handleSubmit} 
          isEditing={true}
          onChange={handleFormChange}
        />

        {/* Dialog for unsaved changes */}
        <Dialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifications non enregistrées</DialogTitle>
              <DialogDescription>
                Vous avez des modifications non enregistrées. Voulez-vous quitter sans enregistrer ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUnsavedDialog(false)}>
                Continuer l'édition
              </Button>
              <Button onClick={handleConfirmNavigation} variant="destructive">
                Quitter sans enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default EditAuditPage;
