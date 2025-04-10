
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { 
  FileText, 
  Calendar, 
  User, 
  Building,
  Download,
  Share,
  Printer,
  ArrowLeft,
  Edit,
  CheckCircle2,
  ClockIcon,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for a single audit
const mockAudit = {
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
    { id: 2, title: "Absence de politique de sécurité formalisée", severity: "medium", area: "Sécurité", description: "Aucune documentation sur les politiques de sécurité n'est disponible ou suivie." },
    { id: 3, title: "Manque de redondance réseau", severity: "high", area: "Réseau", description: "Aucune redondance n'est en place pour les connexions Internet et inter-sites." },
    { id: 4, title: "Sauvegardes non testées régulièrement", severity: "medium", area: "Sauvegarde & Continuité", description: "Les sauvegardes sont effectuées mais leur restauration n'est pas testée périodiquement." },
    { id: 5, title: "Mise à jour logiciels irrégulière", severity: "low", area: "Maintenance", description: "Les mises à jour des logiciels critiques ne sont pas effectuées selon un calendrier régulier." }
  ],
  recommendations: [
    { id: 1, title: "Renouvellement du parc serveurs", priority: "high", timeframe: "3 mois", description: "Remplacer les serveurs obsolètes par des équipements récents avec garantie constructeur." },
    { id: 2, title: "Création d'une PSSI", priority: "medium", timeframe: "6 mois", description: "Élaborer et documenter une Politique de Sécurité du Système d'Information complète." },
    { id: 3, title: "Mise en place d'une redondance réseau", priority: "high", timeframe: "2 mois", description: "Installer une seconde connexion Internet avec un fournisseur différent et des équipements de basculement automatique." }
  ]
};

type AuditStatus = "completed" | "in-progress" | "draft";

const statusConfig: Record<AuditStatus, { icon: React.ElementType; color: string; label: string }> = {
  "completed": { icon: CheckCircle2, color: "text-green-600", label: "Terminé" },
  "in-progress": { icon: ClockIcon, color: "text-amber-600", label: "En cours" },
  "draft": { icon: AlertCircle, color: "text-blue-600", label: "Brouillon" }
};

const severityColors = {
  high: "text-red-600 bg-red-50 border-red-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  low: "text-green-600 bg-green-50 border-green-200"
};

const priorityColors = {
  high: "text-red-600 bg-red-50 border-red-200",
  medium: "text-amber-600 bg-amber-50 border-amber-200",
  low: "text-green-600 bg-green-50 border-green-200"
};

const AuditDetails = () => {
  const { id } = useParams();
  const [audit, setAudit] = useState(mockAudit);
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
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [id]);

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

  const status = statusConfig[audit.status as AuditStatus];
  const StatusIcon = status.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center mb-4 text-audit-blue-600 hover:text-audit-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Retour au tableau de bord
            </Link>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <FileText className="h-6 w-6 text-audit-blue-600" />
              {audit.title}
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Exporter
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" /> Partager
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" /> Imprimer
            </Button>
            <Button asChild className="bg-audit-blue-600 hover:bg-audit-blue-700">
              <Link to={`/audits/${id}/edit`}>
                <Edit className="h-4 w-4 mr-2" /> Modifier
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Building className="h-4 w-4" /> Client
                </span>
                <span className="font-medium">{audit.client}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1">
                  <User className="h-4 w-4" /> Contact
                </span>
                <span className="font-medium">{audit.contactName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Créé le
                </span>
                <span>{formatDate(audit.createdAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Mis à jour
                </span>
                <span>{formatDate(audit.updatedAt)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Type d'audit</span>
                <span>{audit.auditType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Secteur</span>
                <span>{audit.sector}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">État</span>
                <Badge 
                  variant="outline" 
                  className={`flex items-center gap-1 ${status.color}`}
                >
                  <StatusIcon className="h-3 w-3" />
                  {status.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{audit.description}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Progression du rapport</span>
              <span className="text-sm font-normal">{Math.round(audit.progress)}% complété</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div 
                className="bg-audit-blue-600 h-2.5 rounded-full" 
                style={{ width: `${audit.progress}%` }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {audit.sections.map((section) => (
                <div 
                  key={section.id} 
                  className="bg-white border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{section.title}</h3>
                    <span className="text-xs text-muted-foreground">{section.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-audit-blue-600 h-1.5 rounded-full" 
                      style={{ width: `${section.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="findings">
          <TabsList>
            <TabsTrigger value="findings">Constatations</TabsTrigger>
            <TabsTrigger value="recommendations">Recommandations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="findings" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Constatation</TableHead>
                  <TableHead>Domaine</TableHead>
                  <TableHead>Sévérité</TableHead>
                  <TableHead className="w-1/3">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audit.findings.map((finding) => (
                  <TableRow key={finding.id}>
                    <TableCell className="font-medium">{finding.title}</TableCell>
                    <TableCell>{finding.area}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={severityColors[finding.severity as keyof typeof severityColors]}>
                        {finding.severity === 'high' && 'Haute'}
                        {finding.severity === 'medium' && 'Moyenne'}
                        {finding.severity === 'low' && 'Faible'}
                      </Badge>
                    </TableCell>
                    <TableCell>{finding.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="recommendations" className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recommandation</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Délai</TableHead>
                  <TableHead className="w-1/3">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {audit.recommendations.map((recommendation) => (
                  <TableRow key={recommendation.id}>
                    <TableCell className="font-medium">{recommendation.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={priorityColors[recommendation.priority as keyof typeof priorityColors]}>
                        {recommendation.priority === 'high' && 'Haute'}
                        {recommendation.priority === 'medium' && 'Moyenne'}
                        {recommendation.priority === 'low' && 'Faible'}
                      </Badge>
                    </TableCell>
                    <TableCell>{recommendation.timeframe}</TableCell>
                    <TableCell>{recommendation.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AuditDetails;
