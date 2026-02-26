'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Animated Background Elements - Adaptés à l'écran */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20">
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-morphing" />
        <div className="absolute -bottom-32 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-parallaxShift" />
        <div className="absolute top-1/2 -right-40 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-primary/50 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[600px] sm:min-h-[700px]">
          
          {/* Left Column - Responsive */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12 text-center md:text-left">
            
            {/* Badge */}
            <div className="space-y-4 sm:space-y-6 overflow-hidden">
              <p className="text-[10px] sm:text-xs tracking-[0.4em] text-muted-foreground uppercase font-light animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.1s' }}>
                Téléphones Premium
              </p>
              
              {/* Titres - Responsive */}
              <h1 className="space-y-2 sm:space-y-3">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.9] animate-textReveal opacity-0" style={{ animationDelay: '0.2s' }}>
                  Redéfini
                </span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.9] text-primary animate-textReveal opacity-0" style={{ animationDelay: '0.35s' }}>
                  Occasion
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 leading-relaxed font-light animate-slideInFromLeft opacity-0 px-4 md:px-0" style={{ animationDelay: '0.5s' }}>
              Une sélection curatée de téléphones haut de gamme, méticuleusement inspectés et garantis. Qualité premium à prix accessible.
            </p>

            {/* Important Info Box */}
            <div className="bg-foreground/5 backdrop-blur-sm border border-foreground/20 p-4 sm:p-6 lg:p-8 mx-4 md:mx-0 rounded-lg animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.65s' }}>
              <p className="text-[10px] sm:text-xs tracking-widest uppercase mb-2 sm:mb-3 font-light">Important</p>
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/70">
                Tous nos appareils sont inspectés, fonctionnels et garantis. Chaque téléphone bénéficie d'une vérification complète avant expédition.
              </p>
            </div>

            {/* CTA Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 px-4 md:px-0 animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.8s' }}>
              <Link 
                href="/checkout" 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-foreground text-background font-medium tracking-wide rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 group"
              >
                <span className="relative text-sm sm:text-base">
                  Découvrir Collection
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-background group-hover:w-full transition-all duration-500" />
                </span>
              </Link>
              <a 
                href="#delivery" 
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-foreground text-foreground font-medium tracking-wide rounded-lg hover:bg-foreground hover:text-background transition-all duration-500 text-sm sm:text-base"
              >
                Livraison
              </a>
            </div>

            {/* Stats Section - Responsive */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 lg:pt-12 border-t border-foreground/10 mx-4 md:mx-0 animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.95s' }}>
              <div className="space-y-1 sm:space-y-2 text-center md:text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">500+</p>
                <p className="text-[8px] sm:text-[10px] md:text-xs tracking-widest text-muted-foreground uppercase">Appareils</p>
              </div>
              <div className="space-y-1 sm:space-y-2 text-center md:text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">100%</p>
                <p className="text-[8px] sm:text-[10px] md:text-xs tracking-widest text-muted-foreground uppercase">Testés</p>
              </div>
              <div className="space-y-1 sm:space-y-2 text-center md:text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">24h</p>
                <p className="text-[8px] sm:text-[10px] md:text-xs tracking-widest text-muted-foreground uppercase">Support</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image Gallery (caché sur mobile, visible à partir de md) */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] hidden md:block">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full">
              
              {/* Main Large Image */}
              <div className="col-span-2 row-span-2 bg-gradient-to-br from-muted to-muted/50 overflow-hidden border border-foreground/10 rounded-xl animate-imageZoom opacity-0 relative" style={{ animationDelay: '0.3s' }}>
                <Image
                  src="https://images.unsplash.com/photo-1592286927505-1def25115558?w=800&h=800&fit=crop&q=80"
                  alt="Premium iPhone"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Small Image 1 */}
              <div className="bg-gradient-to-br from-muted to-muted/50 overflow-hidden border border-foreground/10 rounded-xl animate-imageZoom opacity-0 relative" style={{ animationDelay: '0.45s' }}>
                <Image
                  src="/accueil.jpg"
                  alt="Samsung Galaxy"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Small Image 2 */}
              <div className="bg-gradient-to-br from-muted to-muted/50 overflow-hidden border border-foreground/10 rounded-xl animate-imageZoom opacity-0 relative" style={{ animationDelay: '0.6s' }}>
                <Image
                  src="/allumé.jpg"
                  alt="Google Pixel"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Responsive */}
        <div className="absolute bottom-6 sm:bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <p className="text-[8px] sm:text-xs tracking-widest text-muted-foreground uppercase">Découvrir</p>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}