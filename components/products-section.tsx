'use client';

import { ProductCard } from './product-card';
import { useEffect, useRef } from 'react';

const PRODUCTS = [ 
   {
    id: '1',
    name: 'iPhone 13',
    price: 120000,
    condition: 'Excellent état',
    specs: '256GB - Espace sidéral',
    image: '/13-simple.jpg',
  },
  {
    id: '2',
    name: 'iPhone 13 Pro',
    price: 130000,
    condition: 'Bon état',
    specs: '128GB - Phantom Black',
    image: '/iphone-13pro.jpg',
  },
  {
    id: '3',
    name: 'iPhone 13 Pro Max',
    price: 140000,
    condition: 'Bon état',
    specs: '128GB - Phantom Black',
    image: '/13-pm.jpg',
  },
  {
    id: '4',
    name: 'iPhone 14',
    price: 145000,
    condition: 'Excellent état',
    specs: '128GB - Obsidienne',
    image: '/14-simple.jpg',
  },
  {
    id: '5',
    name: 'iPhone 14 Pro',
    price: 155000,
    condition: 'Bon état',
    specs: '128GB - Minuit',
    image: '/iphone-14-pro.jpg',
  },
  {
    id: '6',
    name: 'iPhone 14 Pro Max',
    price: 165000,
    condition: 'Excellent état',
    specs: '256GB - Noir volcanique',
    image: '/14-pm.jpg',
  },
  {
    id: '7',
    name: 'iPhone 15',
    price: 170000,
    condition: 'Très bon état',
    specs: '512GB - Noir',
    image: '/15-simple.jpg',
  },
  {
    id: '8',
    name: 'iPhone 15 Pro',
    price: 185000,
    condition: 'Très bon état',
    specs: '512GB - Noir',
    image: '/15-pro.jpg',
  },
  {
    id: '9',
    name: 'iPhone 15 Pro Max',
    price: 200000,
    condition: 'Très bon état',
    specs: '512GB - Noir',
    image: '/15-pm.jpg',
  },
  {
    id: '10',
    name: 'iPhone 16',
    price: 225000,
    condition: 'Très bon état',
    specs: '512GB - Noir',
    image: '/16-simple.jpg',
  },
];

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="iphones" className="relative w-full bg-background py-16 md:py-24 overflow-hidden">
      {/* Éléments décoratifs - adaptés à l'écran */}
      <div className="absolute top-32 -right-40 w-64 h-64 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -left-40 w-80 h-80 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Grille de fond */}
      <div className="absolute inset-0 bg-grid-primary/[0.02] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Responsive */}
        <div className="mb-12 md:mb-16 space-y-3 md:space-y-4 text-center">
          <p className="text-xs sm:text-sm tracking-[0.3em] text-primary uppercase font-light animate-slideInFromLeft opacity-0">
            Collection Premium
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-none animate-textReveal opacity-0">
            Nos <span className="text-primary font-medium">iPhones</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4 animate-slideInFromBottom opacity-0">
            Chaque appareil est rigoureusement inspecté et certifié pour vous offrir une expérience premium.
          </p>
        </div>

        {/* Products Grid - Responsive parfait */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 md:mb-16">
          {PRODUCTS.map((product, index) => (
            <div
              key={product.id}
              className="group animate-revealUp opacity-0"
              style={{ animationDelay: `${0.15 + index * 0.1}s` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        {/* CTA - Responsive */}
        <div className="text-center animate-slideInFromBottom opacity-0" style={{ animationDelay: '0.8s' }}>
          <a 
            href="/checkout" 
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base hover:shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-500"
          >
            <span>Voir toute la collection</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}