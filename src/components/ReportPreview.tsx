
import { FileText, ChevronDown, CheckCircle, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const reportStructure = [
  {
    id: "section1",
    title: "1. Introduction",
    content: "Cette section présente le contexte, les objectifs et la méthodologie de l'audit réalisé.",
    subsections: [
      { id: "1.1", title: "1.1 Contexte de l'audit", completed: true },
      { id: "1.2", title: "1.2 Objectifs", completed: true },
      { id: "1.3", title: "1.3 Méthodologie", completed: true },
      { id: "1.4", title: "1.4 Équipe d'audit", completed: true }
    ]
  },
  {
    id: "section2",
    title: "2. Présentation de l'entreprise",
    content: "Description générale de l'entreprise, son secteur d'activité, sa taille et son organisation.",
    subsections: [
      { id: "2.1", title: "2.1 Profil de l'entreprise", completed: true },
      { id: "2.2", title: "2.2 Secteur d'activité", completed: true },
      { id: "2.3", title: "2.3 Structure organisationnelle", completed: true }
    ]
  },
  {
    id: "section3",
    title: "3. État des lieux du SI",
    content: "Inventaire et analyse de l'infrastructure technique, des applications et de l'organisation du SI.",
    subsections: [
      { id: "3.1", title: "3.1 Infrastructure réseau", completed: true },
      { id: "3.2", title: "3.2 Serveurs et stockage", completed: true },
      { id: "3.3", title: "3.3 Applications métier", completed: false },
      { id: "3.4", title: "3.4 Sécurité", completed: false }
    ]
  },
  {
    id: "section4",
    title: "4. Analyse des flux de données",
    content: "Cartographie et analyse des flux de données au sein du système d'information.",
    subsections: [
      { id: "4.1", title: "4.1 Flux internes", completed: false },
      { id: "4.2", title: "4.2 Flux externes", completed: false },
      { id: "4.3", title: "4.3 Points d'entrée/sortie", completed: false }
    ]
  },
  {
    id: "section5",
    title: "5. Exigences et contraintes",
    content: "Identification des exigences fonctionnelles, non-fonctionnelles et des contraintes techniques.",
    subsections: [
      { id: "5.1", title: "5.1 Exigences fonctionnelles", completed: false },
      { id: "5.2", title: "5.2 Exigences non-fonctionnelles", completed: false },
      { id: "5.3", title: "5.3 Contraintes techniques", completed: false },
      { id: "5.4", title: "5.4 Contraintes réglementaires", completed: false }
    ]
  },
  {
    id: "section6",
    title: "6. Architecture cible",
    content: "Proposition d'architecture cible adaptée aux besoins et aux contraintes identifiés.",
    subsections: [
      { id: "6.1", title: "6.1 Schéma d'architecture", completed: false },
      { id: "6.2", title: "6.2 Composants techniques", completed: false },
      { id: "6.3", title: "6.3 Justification des choix", completed: false }
    ]
  },
  {
    id: "section7",
    title: "7. Conclusion et recommandations",
    content: "Synthèse de l'audit et recommandations d'amélioration pour le système d'information.",
    subsections: [
      { id: "7.1", title: "7.1 Synthèse des constats", completed: false },
      { id: "7.2", title: "7.2 Recommandations", completed: false },
      { id: "7.3", title: "7.3 Plan d'action proposé", completed: false }
    ]
  }
];

const ReportPreview = () => {
  // Calculate completion percentage
  const totalSubsections = reportStructure.reduce(
    (total, section) => total + section.subsections.length,
    0
  );
  
  const completedSubsections = reportStructure.reduce(
    (total, section) => total + section.subsections.filter(sub => sub.completed).length,
    0
  );
  
  const completionPercentage = Math.round((completedSubsections / totalSubsections) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-audit-blue-600" />
              Aperçu du rapport
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" /> Prévisualiser
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" /> Exporter
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1 text-sm">
              <span>Progression du rapport</span>
              <span className="font-medium">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-audit-blue-600 h-2.5 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="border rounded-md">
            {reportStructure.map((section) => {
              const sectionCompletedSubsections = section.subsections.filter(sub => sub.completed).length;
              const sectionTotalSubsections = section.subsections.length;
              const sectionCompletion = (sectionCompletedSubsections / sectionTotalSubsections) * 100;
              
              return (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span className="font-medium">{section.title}</span>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground mr-2">
                          {sectionCompletedSubsections}/{sectionTotalSubsections}
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-audit-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${sectionCompletion}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3 pt-0">
                    <p className="text-sm text-muted-foreground mb-3">{section.content}</p>
                    <div className="space-y-2">
                      {section.subsections.map((subsection) => (
                        <div 
                          key={subsection.id} 
                          className="flex items-center justify-between text-sm p-2 rounded-md border"
                        >
                          <span>{subsection.title}</span>
                          {subsection.completed ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" /> Complété
                            </span>
                          ) : (
                            <span className="text-audit-gray-400">À compléter</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportPreview;
