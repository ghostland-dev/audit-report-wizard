
import { Link } from "react-router-dom";
import { ArrowRight, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const features = [
  {
    title: "Génération automatique de rapports",
    description: "Créez des rapports d'audit complets et professionnels en quelques clics.",
    icon: FileText,
  },
  {
    title: "Modèles personnalisables",
    description: "Adaptez vos rapports avec des modèles prédéfinis selon les besoins spécifiques de chaque audit.",
    icon: Check,
  },
  {
    title: "Exportation et partage faciles",
    description: "Exportez vos rapports en PDF ou Word et partagez-les facilement avec vos clients ou collègues.",
    icon: ArrowRight,
  },
];

const sections = [
  "Introduction et présentation de l'entreprise",
  "État des lieux technique du SI",
  "Analyse des flux de données",
  "Contraintes et enjeux",
  "Exigences fonctionnelles et techniques",
  "Architecture cible",
  "Recommandations stratégiques",
  "Indicateurs de suivi et validation",
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="container px-4 py-20 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-audit-gray-900 mb-4">
                  Automatisez vos rapports d'audit SI
                </h1>
                <p className="text-xl text-audit-gray-600 mb-8">
                  Générez des rapports d'audit professionnels, complets et personnalisés pour vos systèmes d'information en quelques minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild className="bg-audit-blue-600 hover:bg-audit-blue-700 px-8 py-6 text-lg">
                    <Link to="/create-audit">
                      Créer un rapport d'audit
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="text-lg px-8 py-6">
                    <Link to="/dashboard">
                      Voir le tableau de bord
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4 pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-audit-blue-600" />
                    <h3 className="font-bold">Aperçu d'un rapport d'audit</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-audit-blue-100 text-audit-blue-600 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm text-audit-gray-700">{section}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-audit-gray-900 mb-4">
              Fonctionnalités principales
            </h2>
            <p className="text-lg text-audit-gray-600 max-w-3xl mx-auto">
              Notre plateforme d'audit vous offre tous les outils nécessaires pour réaliser et documenter des audits de systèmes d'information efficaces.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="rounded-full bg-audit-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-audit-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-audit-gray-900 mb-2">{feature.title}</h3>
                <p className="text-audit-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-audit-blue-600">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à commencer votre audit ?
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
              Créez votre premier rapport d'audit en quelques minutes et améliorez l'efficacité de vos processus d'audit informatique.
            </p>
            <Button asChild variant="secondary" className="text-audit-blue-600 px-8 py-6 text-lg">
              <Link to="/create-audit">
                Créer un nouvel audit
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
