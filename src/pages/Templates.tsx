import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, FileText, Edit, Trash, Download, Star, Copy } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  isDefault: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

const mockTemplates: Template[] = [
  {
    id: 1,
    name: "Audit de sécurité informatique",
    description: "Modèle complet pour les audits de sécurité IT incluant infrastructure, applications et processus",
    category: "Sécurité",
    isDefault: true,
    usageCount: 25,
    createdAt: "2023-01-15",
    updatedAt: "2023-12-01"
  },
  {
    id: 2,
    name: "Audit RGPD",
    description: "Template pour évaluer la conformité RGPD et la protection des données personnelles",
    category: "Conformité",
    isDefault: false,
    usageCount: 12,
    createdAt: "2023-03-20",
    updatedAt: "2023-11-15"
  },
  {
    id: 3,
    name: "Audit infrastructure réseau",
    description: "Modèle spécialisé pour l'audit des architectures réseau et télécommunications",
    category: "Infrastructure",
    isDefault: false,
    usageCount: 8,
    createdAt: "2023-05-10",
    updatedAt: "2023-10-30"
  }
];

const TemplatesPage = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState(mockTemplates);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteTemplate = async (template: Template) => {
    try {
      setTemplates(prev => prev.filter(t => t.id !== template.id));
      toast({
        title: "Template supprimé",
        description: `Le template "${template.name}" a été supprimé avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le template.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setTemplateToDelete(null);
    }
  };

  const handleDuplicateTemplate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: Math.max(...templates.map(t => t.id)) + 1,
      name: `${template.name} (Copie)`,
      isDefault: false,
      usageCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    toast({
      title: "Template dupliqué",
      description: `Le template "${newTemplate.name}" a été créé.`,
    });
  };

  const handleUseTemplate = (template: Template) => {
    toast({
      title: "Template sélectionné",
      description: `Redirection vers la création d'audit avec le template "${template.name}".`,
    });
  };

  return (
    <Layout>
      <div className="container py-8 px-4 mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Templates d'audit</h1>
            <p className="text-muted-foreground">Gérez vos modèles d'audit réutilisables</p>
          </div>
          <Button asChild className="bg-audit-blue-600 hover:bg-audit-blue-700">
            <Link to="/templates/create">
              <Plus className="h-4 w-4 mr-2" />
              Créer un template
            </Link>
          </Button>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Rechercher un template..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-audit-blue-600" />
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {template.isDefault && (
                        <Badge variant="secondary" className="mt-1">
                          <Star className="h-3 w-3 mr-1" />
                          Par défaut
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {template.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Catégorie:</span>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilisations:</span>
                    <span>{template.usageCount} fois</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mis à jour:</span>
                    <span>{new Date(template.updatedAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button 
                  onClick={() => handleUseTemplate(template)}
                  className="flex-1"
                  size="sm"
                >
                  Utiliser
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDuplicateTemplate(template)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link to={`/templates/${template.id}/edit`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                
                {!template.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTemplateToDelete(template);
                      setDeleteDialogOpen(true);
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">Aucun template trouvé</h3>
            <p className="mt-2 text-muted-foreground">
              {searchQuery ? "Aucun template ne correspond à votre recherche." : "Commencez par créer votre premier template."}
            </p>
            {!searchQuery && (
              <Button asChild className="mt-4">
                <Link to="/templates/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Créer un template
                </Link>
              </Button>
            )}
          </div>
        )}

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Supprimer le template</DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer le template "{templateToDelete?.name}" ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Annuler
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => templateToDelete && handleDeleteTemplate(templateToDelete)}
              >
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default TemplatesPage;