'use client';

import { Clock, Zap, Truck, Shield } from 'lucide-react';

export function DeliverySection() {
  return (
    <section id="delivery" className="relative w-full bg-foreground text-background py-40 border-t border-foreground/10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-0 -right-40 w-96 h-96 bg-primary rounded-full blur-3xl animate-parallaxShift" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-accent rounded-full blur-3xl animate-morphing" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-32 space-y-8 text-center md:text-left">
          <div className="space-y-6 overflow-hidden max-w-2xl">
            <p className="text-xs tracking-[0.4em] text-background/60 uppercase font-light animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.1s' }}>
              Livraison
            </p>
            <h2 className="text-8xl md:text-9xl font-light leading-none animate-textReveal opacity-0" style={{ animationDelay: '0.2s' }}>
              <span className="block">Flexible</span>
              <span className="block">Rapide</span>
            </h2>
          </div>
          
          <p className="text-xl text-background/70 max-w-2xl font-light leading-relaxed animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.35s' }}>
            Choisissez le mode de livraison qui vous convient. Tous nos envois sont assurés et suivi en temps réel.
          </p>
        </div>

        {/* Delivery Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Standard Delivery */}
          <div className="group border border-background/20 bg-background/5 backdrop-blur-sm p-12 hover:border-primary/50 hover:bg-background/10 transition-all duration-500 animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-background/60 uppercase font-light">Standard</p>
                <h3 className="text-4xl font-light text-background">7-10 Jours</h3>
              </div>
              <Clock className="w-12 h-12 text-background/40 group-hover:text-primary transition-colors duration-500" />
            </div>

            <div className="space-y-6">
              <div className="border-t border-background/10 pt-6 space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-background/70 font-light">Tarif</p>
                  <p className="text-3xl font-light text-background">Gratuit</p>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  'Suivi en temps réel',
                  'Emballage professionnel',
                  'Assurance incluse',
                  'Signature à la livraison'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm font-light">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-background/80">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full mt-8 px-6 py-3 bg-background/20 hover:bg-background/40 text-background border border-background/20 transition-all duration-500 text-sm tracking-widest uppercase font-light">
                Choisir Standard
              </button>
            </div>
          </div>

          {/* Express Delivery */}
          <div className="group border border-primary/50 bg-primary/10 backdrop-blur-sm p-12 hover:bg-primary/20 transition-all duration-500 animate-slideInFromRight opacity-0" style={{ animationDelay: '0.5s' }}>
            <div className="absolute -top-4 left-8 bg-foreground px-4 py-2 text-foreground text-xs tracking-widest uppercase font-bold">
              Popular
            </div>

            <div className="flex items-center justify-between mb-12">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-background/60 uppercase font-light">Express</p>
                <h3 className="text-4xl font-light text-background">3-7 Jours</h3>
              </div>
              <Zap className="w-12 h-12 text-primary animate-float" />
            </div>

            <div className="space-y-6">
              <div className="border-t border-background/10 pt-6 space-y-1">
                <p className="text-sm text-background/70 font-light">Tarif</p>
                <p className="text-3xl font-light text-background">+$15</p>
                <p className="text-xs text-background/60 font-light mt-2">Frais supplémentaires</p>
              </div>

              <ul className="space-y-4">
                {[
                  'Livraison prioritaire',
                  'Suivi en temps réel',
                  'Emballage premium',
                  'Assurance complète'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm font-light">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-background/80">{item}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full mt-8 px-6 py-3 bg-background text-foreground hover:bg-background/90 border border-background transition-all duration-500 text-sm tracking-widest uppercase font-light">
                Choisir Express
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 pt-20 border-t border-background/10">
          {[
            {
              icon: Shield,
              title: 'Assuré',
              desc: 'Tous les envois sont assurés contre les dommages'
            },
            {
              icon: Truck,
              title: 'Suivi',
              desc: 'Numéro de suivi fourni immédiatement'
            },
            {
              icon: Clock,
              title: 'Fiable',
              desc: 'Partenaire logistique de confiance'
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4 animate-revealUp opacity-0"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <Icon className="w-8 h-8 text-background/40 mx-auto" />
                <div>
                  <h4 className="font-light text-lg">{feature.title}</h4>
                  <p className="text-sm text-background/60 font-light">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
