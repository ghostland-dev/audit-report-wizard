import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, FileText, Users, Clock } from "lucide-react";
import { toast } from "sonner";

interface TemplateSection {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

interface AuditTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  estimatedDuration: string;
  sections: TemplateSection[];
}

const mockTemplate: AuditTemplate = {
  id: 1,
  name: "Audit de sécurité informatique",
  description: "Template complet pour l'audit de sécurité des systèmes d'information",
  category: "Sécurité",
  estimatedDuration: "2-3 semaines",
  sections: [
    {
      id: "intro",
      title: "Introduction",
      description: "Contexte et objectifs de l'audit",
      required: true
    },
    {
      id: "company",
      title: "Présentation de l'entreprise",
      description: "Informations générales sur l'organisation",
      required: true
    },
    {
      id: "technical",
      title: "État technique du SI",
      description: "Analyse de l'infrastructure existante",
      required: true
    },
    {
      id: "scope",
      title: "Périmètre d'audit",
      description: "Définition du scope de l'audit",
      required: true
    },
    {
      id: "methodology",
      title: "Méthodologie",
      description: "Approche et méthodes utilisées",
      required: false
    },
    {
      id: "findings",
      title: "Constatations",
      description: "Résultats et observations",
      required: true
    },
    {
      id: "recommendations",
      title: "Recommandations",
      description: "Actions recommandées",
      required: true
    }
  ]
};

const TemplateEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<AuditTemplate>(mockTemplate);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // In a real app, fetch template by id
    if (id) {
      setTemplate(mockTemplate);
    }
  }, [id]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Template mis à jour avec succès");
      navigate("/templates");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  const addSection = () => {
    const newSection: TemplateSection = {
      id: `section_${Date.now()}`,
      title: "Nouvelle section",
      description: "",
      required: false
    };
    setTemplate(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (sectionId: string, field: keyof TemplateSection, value: any) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    }));
  };

  const removeSection = (sectionId: string) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };

  return (
    <Layout>
      <div className="container py-8 px-4 mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/templates")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Modifier le template</h1>
            <p className="text-muted-foreground">Personnalisez votre template d'audit</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du template</Label>
                    <Input
                      id="name"
                      value={template.name}
                      onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Nom du template"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Input
                      id="category"
                      value={template.category}
                      onChange={(e) => setTemplate(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="Catégorie"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={template.description}
                    onChange={(e) => setTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description du template"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Durée estimée</Label>
                  <Input
                    id="duration"
                    value={template.estimatedDuration}
                    onChange={(e) => setTemplate(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                    placeholder="ex: 2-3 semaines"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Sections du template</CardTitle>
                  <Button onClick={addSection} size="sm">
                    Ajouter une section
                  </Button>
                </div>
                <CardDescription>
                  Définissez les sections qui composeront vos rapports d'audit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {template.sections.map((section, index) => (
                  <div key={section.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Section {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={section.required ? "default" : "secondary"}>
                          {section.required ? "Obligatoire" : "Optionnelle"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSection(section.id)}
                          className="text-destructive"
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label>Titre de la section</Label>
                        <Input
                          value={section.title}
                          onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                          placeholder="Titre"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label>Type</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant={section.required ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateSection(section.id, 'required', true)}
                          >
                            Obligatoire
                          </Button>
                          <Button
                            variant={!section.required ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateSection(section.id, 'required', false)}
                          >
                            Optionnelle
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label>Description</Label>
                      <Textarea
                        value={section.description}
                        onChange={(e) => updateSection(section.id, 'description', e.target.value)}
                        placeholder="Description de cette section"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleSave} 
                  className="w-full"
                  disabled={isLoading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Sauvegarde..." : "Sauvegarder"}
                </Button>
                <Button variant="outline" className="w-full">
                  Aperçu du template
                </Button>
                <Button variant="outline" className="w-full">
                  Dupliquer le template
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Statistiques d'utilisation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Audits créés</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dernière utilisation</span>
                  <span className="font-medium">Il y a 2 jours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Popularité</span>
                  <span className="font-medium">⭐ 4.8/5</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">Créé le</div>
                  <div className="text-muted-foreground">15 novembre 2023</div>
                </div>
                <div>
                  <div className="font-medium">Modifié le</div>
                  <div className="text-muted-foreground">Aujourd'hui à 14:30</div>
                </div>
                <div>
                  <div className="font-medium">Version</div>
                  <div className="text-muted-foreground">v2.1</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateEditPage;