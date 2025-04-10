
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const benefits = [
    "Rapports d'audit professionnels",
    "Modèles personnalisables",
    "Collaboration en temps réel"
  ];

  return (
    <section className="pt-16 pb-24 bg-gradient-to-b from-white to-gray-50">
      <div className="audit-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
                Simplifiez vos audits avec notre plateforme intelligente
              </h1>
              <p className="text-xl text-audit-gray-600">
                Créez, gérez et partagez des rapports d'audit professionnels en quelques clics. Notre outil tout-en-un vous aide à gagner du temps et à améliorer la qualité de vos audits.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-audit-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                className="bg-audit-blue-600 hover:bg-audit-blue-700 h-12 px-6 text-lg"
              >
                <Link to="/dashboard">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="h-12 px-6 text-lg"
              >
                Demander une démo
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-audit-blue-100 rounded-full opacity-70 blur-3xl"></div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-audit-blue-200 rounded-full opacity-70 blur-3xl"></div>
            
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="bg-audit-blue-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Audit Report Wizard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="h-10 bg-audit-gray-100 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-audit-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-audit-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-audit-gray-100 rounded w-2/3"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-audit-gray-100 rounded"></div>
                    <div className="h-24 bg-audit-gray-100 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-audit-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-audit-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-audit-gray-100 rounded w-3/4"></div>
                  </div>
                  <div className="flex justify-end">
                    <div className="h-10 bg-audit-blue-600 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
