
import { 
  ClipboardList, 
  FileText, 
  Clock, 
  Layout, 
  Shield, 
  LineChart 
} from "lucide-react";

const features = [
  {
    name: 'Rapports automatisés',
    description: 'Générez des rapports d'audit complets avec une structure professionnelle en quelques clics.',
    icon: FileText,
  },
  {
    name: 'Modèles personnalisables',
    description: 'Adaptez la structure de vos rapports selon les besoins spécifiques de vos clients et projets.',
    icon: ClipboardList,
  },
  {
    name: 'Gain de temps considérable',
    description: 'Réduisez de 70% le temps consacré à la rédaction de vos rapports d\'audit.',
    icon: Clock,
  },
  {
    name: 'Tableaux de bord visuels',
    description: 'Visualisez les données d\'audit à travers des graphiques et indicateurs personnalisés.',
    icon: LineChart,
  },
  {
    name: 'Exports multiformats',
    description: 'Exportez vos rapports au format PDF ou Word pour un partage et une modification faciles.',
    icon: Layout,
  },
  {
    name: 'Sécurité et confidentialité',
    description: 'Vos données sont protégées par des systèmes de sécurité conformes aux normes RGPD.',
    icon: Shield,
  },
]

const Features = () => {
  return (
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="audit-container">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-audit-blue-600">Gagnez en productivité</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tout ce dont vous avez besoin pour vos audits SI
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Notre plateforme offre un ensemble complet d'outils pour simplifier et standardiser vos rapports 
            d'audit de systèmes d'information, du recueil des données à la production du document final.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="card-hover flex flex-col rounded-xl bg-white p-6 shadow">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-6 w-6 flex-none text-audit-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
