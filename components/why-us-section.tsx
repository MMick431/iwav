'use client';

import { Shield, Truck, RotateCcw, HeadphonesIcon, Award, Heart } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: "Garantie 1 mois",
    description: "Tous nos iPhones sont garantis 1 mois pièces et main d'œuvre"
  },
  {
    icon: Truck,
    title: "Livraison express",
    description: "Livraison en 7 à 10 jours à domicile ou en point relais"
  },
  {
    icon: RotateCcw,
    title: "Retour gratuit",
    description: "Satisfait ou remboursé pendant 14 jours"
  },
  {
    icon: HeadphonesIcon,
    title: "Support WhatsApp",
    description: "Une équipe disponible 7j/7 pour vous accompagner"
  },
  {
    icon: Award,
    title: "Contrôle qualité",
    description: "Chaque iPhone est testé par nos experts"
  },
  {
    icon: Heart,
    title: "État impeccable",
    description: "certains de nos iPhones sont reconditionnés avec soin"
  }
];

export function WhyUsSection() {
  return (
    <section className="py-5 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pourquoi nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">choisir ?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez ce qui fait la différence chez nous
          </p>
        </div>

        {/* Grille des raisons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Dégradé au hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                {/* Contenu */}
                <div className="relative z-10">
                  <div className="inline-flex p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}