
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  FileText, 
  Clock, 
  Calendar, 
  Search, 
  Bookmark,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  ClockIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for demonstration
const recentAudits = [
  { 
    id: 1, 
    title: "Audit SI - Société ABC", 
    client: "ABC Inc.",
    updatedAt: "2023-12-10T10:30:00", 
    status: "completed",
    progress: 100
  },
  { 
    id: 2, 
    title: "Analyse infrastructure - XYZ Group", 
    client: "XYZ Group", 
    updatedAt: "2023-12-05T14:45:00", 
    status: "in-progress",
    progress: 65
  },
  { 
    id: 3, 
    title: "Audit sécurité - Tech Solutions", 
    client: "Tech Solutions", 
    updatedAt: "2023-11-28T09:15:00", 
    status: "draft",
    progress: 30
  },
  { 
    id: 4, 
    title: "Évaluation RGPD - Global Services", 
    client: "Global Services", 
    updatedAt: "2023-11-20T16:20:00", 
    status: "completed",
    progress: 100
  },
];

type AuditStatus = "completed" | "in-progress" | "draft";

const statusConfig: Record<AuditStatus, { icon: React.ElementType; color: string; label: string }> = {
  "completed": { icon: CheckCircle2, color: "text-green-600", label: "Terminé" },
  "in-progress": { icon: ClockIcon, color: "text-amber-600", label: "En cours" },
  "draft": { icon: AlertCircle, color: "text-blue-600", label: "Brouillon" }
};

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAudits, setFilteredAudits] = useState(recentAudits);

  useEffect(() => {
    const filtered = recentAudits.filter(
      (audit) => 
        audit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.client.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAudits(filtered);
  }, [searchQuery]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        <Button asChild className="bg-audit-blue-600 hover:bg-audit-blue-700">
          <Link to="/create-audit">
            <Plus className="mr-2 h-4 w-4" /> Nouvel audit
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total des audits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-audit-blue-600" />
              12
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Audits en cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <Clock className="h-6 w-6 text-amber-600" />
              3
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dernière activité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-2">
              <Calendar className="h-6 w-6 text-audit-gray-600" />
              <span className="text-lg">{formatDate(new Date().toISOString())}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Vos audits</h2>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un audit..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="recent">Récents</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
            <TabsTrigger value="drafts">Brouillons</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {filteredAudits.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredAudits.map((audit) => {
                  const status = statusConfig[audit.status as AuditStatus];
                  const StatusIcon = status.icon;
                  
                  return (
                    <Card key={audit.id} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-audit-blue-600" />
                              <Link 
                                to={`/audits/${audit.id}`} 
                                className="text-lg font-medium hover:text-audit-blue-600"
                              >
                                {audit.title}
                              </Link>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Client: {audit.client}
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge 
                              variant="outline" 
                              className={`flex items-center gap-1 ${status.color}`}
                            >
                              <StatusIcon className="h-3 w-3" />
                              {status.label}
                            </Badge>
                            <div className="text-xs text-muted-foreground">
                              Mis à jour le {formatDate(audit.updatedAt)}
                            </div>
                          </div>
                        </div>
                        {audit.status !== "completed" && (
                          <div className="mt-4">
                            <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                              <span>Progression</span>
                              <span>{audit.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-audit-blue-600 h-2 rounded-full" 
                                style={{ width: `${audit.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        <div className="mt-4 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-audit-blue-600 hover:text-audit-blue-700 hover:bg-audit-blue-50"
                          >
                            <Link to={`/audits/${audit.id}`}>
                              Voir les détails <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Aucun audit trouvé</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Nous n'avons trouvé aucun audit correspondant à votre recherche.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="recent" className="mt-6">
            <div className="text-center py-10">
              <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Audits récents</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vos audits les plus récents apparaîtront ici.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <div className="text-center py-10">
              <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Audits terminés</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vos audits terminés apparaîtront ici.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="drafts" className="mt-6">
            <div className="text-center py-10">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Brouillons</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vos audits en cours de rédaction apparaîtront ici.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
