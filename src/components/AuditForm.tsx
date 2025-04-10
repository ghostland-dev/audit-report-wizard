
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, FileText, Info, Users, Server, Database, ShieldCheck, BarChart, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Sections of the audit report
const reportSections = [
  { id: "intro", title: "Introduction", icon: FileText, required: true },
  { id: "company", title: "Présentation de l'entreprise", icon: Users, required: true },
  { id: "technical", title: "État des lieux technique du SI", icon: Server, required: true },
  { id: "data", title: "Analyse des flux de données", icon: Database, required: true },
  { id: "constraints", title: "Contraintes et enjeux", icon: Info, required: true },
  { id: "requirements", title: "Exigences fonctionnelles et non-fonctionnelles", icon: FileQuestion, required: true },
  { id: "summary", title: "Synthèse de l'audit", icon: CheckCircle, required: true },
  { id: "architecture", title: "Conception de l'architecture cible", icon: Server, required: false },
  { id: "security", title: "Recommandations de sécurité", icon: ShieldCheck, required: false },
  { id: "kpi", title: "Indicateurs de validation et dashboard", icon: BarChart, required: false },
];

const AuditForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    contactName: "",
    contactEmail: "",
    sector: "",
    auditType: "",
    employeeCount: "",
    description: "",
    selectedSections: reportSections.filter(section => section.required).map(section => section.id),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSection = (sectionId: string) => {
    setFormData(prev => {
      const selectedSections = [...prev.selectedSections];
      const section = reportSections.find(s => s.id === sectionId);
      
      // Can't remove required sections
      if (section?.required) return prev;
      
      if (selectedSections.includes(sectionId)) {
        return {
          ...prev,
          selectedSections: selectedSections.filter(id => id !== sectionId)
        };
      } else {
        return {
          ...prev,
          selectedSections: [...selectedSections, sectionId]
        };
      }
    });
  };

  const isSectionSelected = (sectionId: string) => {
    return formData.selectedSections.includes(sectionId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.client.trim() || !formData.auditType) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    // Here, you would typically save the audit to your backend
    console.log("Audit form submitted:", formData);
    
    // Show success message
    toast({
      title: "Audit créé avec succès",
      description: "Votre projet d'audit a été créé et est prêt à être complété.",
    });
    
    // Redirect to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Informations générales</CardTitle>
          <CardDescription>
            Renseignez les informations de base concernant votre audit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du rapport <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                name="title"
                placeholder="Ex: Audit du SI - Entreprise XYZ"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Nom du client <span className="text-red-500">*</span></Label>
              <Input
                id="client"
                name="client"
                placeholder="Nom de l'entreprise cliente"
                value={formData.client}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">Nom du contact</Label>
              <Input
                id="contactName"
                name="contactName"
                placeholder="Prénom et nom du contact principal"
                value={formData.contactName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email du contact</Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                placeholder="email@example.com"
                value={formData.contactEmail}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sector">Secteur d'activité</Label>
              <Select name="sector" onValueChange={(value) => handleSelectChange("sector", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un secteur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finance">Finance & Banque</SelectItem>
                  <SelectItem value="health">Santé</SelectItem>
                  <SelectItem value="retail">Commerce & Distribution</SelectItem>
                  <SelectItem value="manufacturing">Industrie</SelectItem>
                  <SelectItem value="public">Secteur Public</SelectItem>
                  <SelectItem value="tech">Technologie & IT</SelectItem>
                  <SelectItem value="education">Éducation</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="auditType">Type d'audit <span className="text-red-500">*</span></Label>
              <Select 
                name="auditType" 
                onValueChange={(value) => handleSelectChange("auditType", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete">Audit complet du SI</SelectItem>
                  <SelectItem value="security">Audit de sécurité</SelectItem>
                  <SelectItem value="performance">Audit de performance</SelectItem>
                  <SelectItem value="compliance">Audit de conformité</SelectItem>
                  <SelectItem value="infrastructure">Audit d'infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employeeCount">Nombre d'employés</Label>
              <Input
                id="employeeCount"
                name="employeeCount"
                type="number"
                min="1"
                placeholder="Ex: 250"
                value={formData.employeeCount}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description de l'audit</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Décrivez brièvement l'objectif et le périmètre de cet audit..."
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sections du rapport</CardTitle>
          <CardDescription>
            Sélectionnez les sections que vous souhaitez inclure dans votre rapport d'audit.
            Les sections obligatoires sont pré-sélectionnées.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportSections.map((section) => (
              <div
                key={section.id}
                className={`flex items-center p-4 rounded-lg border cursor-pointer ${
                  isSectionSelected(section.id)
                    ? "border-audit-blue-600 bg-audit-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => toggleSection(section.id)}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isSectionSelected(section.id) ? "bg-audit-blue-600" : "bg-gray-100"
                }`}>
                  <section.icon className={`h-4 w-4 ${
                    isSectionSelected(section.id) ? "text-white" : "text-gray-500"
                  }`} />
                </div>
                <div className="ml-4">
                  <p className="font-medium">{section.title}</p>
                  {section.required && (
                    <p className="text-xs text-audit-blue-600">Obligatoire</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button" onClick={() => navigate("/dashboard")}>
          Annuler
        </Button>
        <Button type="submit" className="bg-audit-blue-600 hover:bg-audit-blue-700">
          Créer l'audit
        </Button>
      </div>
    </form>
  );
};

export default AuditForm;
