
import { Check, FileText, FileCog, ChartBar, Share2, LockKeyhole, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Modèles personnalisables",
    description: "Créez et personnalisez des modèles d'audit adaptés à vos besoins spécifiques."
  },
  {
    icon: FileCog,
    title: "Gestion des preuves",
    description: "Organisez et stockez facilement les preuves recueillies lors de vos audits."
  },
  {
    icon: ChartBar,
    title: "Rapports détaillés",
    description: "Générez des rapports professionnels avec graphiques et tableaux personnalisables."
  },
  {
    icon: Share2,
    title: "Collaboration d'équipe",
    description: "Travaillez efficacement en équipe sur les mêmes projets d'audit en temps réel."
  },
  {
    icon: LockKeyhole,
    title: "Sécurité avancée",
    description: "Vos données sont protégées avec un chiffrement de bout en bout et des contrôles d'accès."
  },
  {
    icon: Tag,
    title: "Analyse des coûts",
    description: "Suivez et analysez les coûts de vos audits pour une meilleure rentabilité."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="audit-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Un outil complet pour les auditeurs professionnels</h2>
          <p className="text-xl text-audit-gray-600">
            Simplifiez vos processus d'audit avec notre plateforme tout-en-un.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-audit-blue-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-audit-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-audit-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-sm text-audit-gray-600">
                        Fonctionnalité {feature.title.split(' ')[0]} {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-audit-blue-600 hover:bg-audit-blue-700 text-lg h-12 px-8">
            Explorer toutes les fonctionnalités
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
