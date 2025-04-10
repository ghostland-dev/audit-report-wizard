
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Download, 
  Edit, 
  FileText,
  Info, 
  Trash, 
  User,
  X
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { AuditData } from "@/components/AuditForm";

const statusConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  "completed": { icon: CheckCircle2, color: "text-green-600", label: "Terminé" },
  "in-progress": { icon: Clock, color: "text-amber-600", label: "En cours" },
  "draft": { icon: Info, color: "text-blue-600", label: "Brouillon" }
};

const AuditDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [audit, setAudit] = useState<AuditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    // Simulating API call to fetch audit details
    const fetchAudit = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, let's simulate a delay and return mock data
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

  const handleDeleteAudit = async () => {
    try {
      // Simulating API call to delete audit
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Audit supprimé",
        description: "L'audit a été supprimé avec succès.",
      });
      
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'audit. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="audit-container py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-audit-blue-600 mx-auto"></div>
              <p className="mt-4 text-audit-gray-600">Chargement des détails de l'audit...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !audit) {
    return (
      <Layout>
        <div className="audit-container py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <X className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Erreur</h2>
            <p className="text-audit-gray-600 mb-6">{error || "Audit non trouvé"}</p>
            <Button
              asChild
              variant="outline"
              className="gap-2"
            >
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                Retour au tableau de bord
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const status = statusConfig[audit.status];
  const formattedStartDate = format(new Date(audit.startDate), 'dd MMMM yyyy', { locale: fr });
  const formattedEndDate = format(new Date(audit.endDate), 'dd MMMM yyyy', { locale: fr });

  return (
    <Layout>
      <div className="audit-container py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="gap-1"
            >
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only sm:not-sr-only">Retour</span>
              </Link>
            </Button>
            
            <h1 className="text-2xl font-bold tracking-tight">{audit.title}</h1>
            <Badge 
              variant="outline" 
              className={`flex items-center gap-1 ml-2 ${status.color}`}
            >
              <status.icon className="h-3 w-3" />
              {status.label}
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 gap-2">
                  <Trash className="h-4 w-4" />
                  Supprimer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Supprimer cet audit ?</DialogTitle>
                  <DialogDescription>
                    Cette action est irréversible. Êtes-vous sûr de vouloir supprimer définitivement cet audit ?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setDeleteDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAudit}
                  >
                    Supprimer
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Link to={`/audits/${id}/edit`}>
                <Edit className="h-4 w-4" />
                Modifier
              </Link>
            </Button>
            
            <Button
              size="sm"
              className="gap-2 bg-audit-blue-600 hover:bg-audit-blue-700"
            >
              <Download className="h-4 w-4" />
              Télécharger le rapport
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="summary">Résumé</TabsTrigger>
                <TabsTrigger value="scope">Périmètre</TabsTrigger>
                <TabsTrigger value="findings">Constatations</TabsTrigger>
                <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé de l'audit</CardTitle>
                    <CardDescription>
                      Vue d'ensemble des informations principales
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Client</div>
                        <div className="font-medium">{audit.client}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Contact</div>
                        <div className="font-medium">{audit.clientContact}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div className="font-medium">{audit.clientEmail}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Statut</div>
                        <div className="font-medium flex items-center gap-1">
                          <status.icon className={`h-4 w-4 ${status.color}`} />
                          {status.label}
                          {audit.status !== "completed" && (
                            <span className="ml-2 text-sm text-muted-foreground">
                              ({audit.progress}% terminé)
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Date de début</div>
                        <div className="font-medium">{formattedStartDate}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Date de fin</div>
                        <div className="font-medium">{formattedEndDate}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="scope" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Périmètre et méthodologie</CardTitle>
                    <CardDescription>
                      Description détaillée du périmètre de l'audit et de la méthodologie utilisée
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Périmètre</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {audit.scope}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Méthodologie</h3>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {audit.methodology || "Aucune méthodologie spécifiée."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="findings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Constatations</CardTitle>
                    <CardDescription>
                      Résultats et observations identifiés pendant l'audit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-muted-foreground whitespace-pre-line">
                        {audit.findings || "Aucune constatation enregistrée pour le moment."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="recommendations" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommandations</CardTitle>
                    <CardDescription>
                      Mesures recommandées suite aux constatations de l'audit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-muted-foreground whitespace-pre-line">
                        {audit.recommendations || "Aucune recommandation formulée pour le moment."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Période</div>
                    <div className="font-medium">
                      {formattedStartDate} - {formattedEndDate}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Client</div>
                    <div className="font-medium">{audit.client}</div>
                    <div className="text-sm text-muted-foreground">{audit.clientEmail}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Statut</div>
                    <div className="font-medium flex items-center gap-1">
                      <status.icon className={`h-4 w-4 ${status.color}`} />
                      {status.label}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full gap-2"
                >
                  <Link to={`/audits/${id}/edit`}>
                    <Edit className="h-4 w-4" />
                    Modifier l'audit
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rapport</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Téléchargez le rapport complet au format PDF pour partager les résultats avec le client.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2 bg-audit-blue-600 hover:bg-audit-blue-700">
                  <Download className="h-4 w-4" />
                  Télécharger le rapport PDF
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuditDetailsPage;
