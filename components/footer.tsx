export function Footer() {
  return (
    <footer className="w-full bg-foreground text-background py-40 border-t border-background/10 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 opacity-15">
        <div className="absolute -top-40 left-1/3 w-96 h-96 bg-primary rounded-full blur-3xl animate-morphing" />
        <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-float" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid md:grid-cols-5 gap-16 mb-24">
          {/* Brand */}
          <div className="space-y-8 md:col-span-2 animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.1s' }}>
            <div className="space-y-4">
              <h4 className="text-5xl font-light">PhoneSelect</h4>
              <p className="text-background/60 text-sm leading-relaxed font-light max-w-xs">
                Téléphones premium d'occasion. Inspectés, testés et garantis pour une satisfaction maximale.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs tracking-[0.3em] text-background/40 uppercase font-light">Nous contacter</p>
              <div className="space-y-3">
                <a href="https://wa.me/2290192338598" target="_blank" rel="noopener noreferrer" className="block text-sm text-background/70 hover:text-background transition-colors font-light">
                  💬 WhatsApp: +229 01 92 33 8598
                </a>
                <a href="mailto:michaelhologan45@gmail.com" className="block text-sm text-background/70 hover:text-background transition-colors font-light">
                  ✉️ michaelhologan45@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6 animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.2s' }}>
            <h5 className="font-light text-xs tracking-[0.3em] uppercase text-background/60">
              Navigation
            </h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors font-light">Accueil</a></li>
              <li><a href="#products" className="text-background/60 hover:text-background transition-colors font-light">Collection</a></li>
              <li><a href="#about" className="text-background/60 hover:text-background transition-colors font-light">À propos</a></li>
              <li><a href="#delivery" className="text-background/60 hover:text-background transition-colors font-light">Livraison</a></li>
            </ul>
          </div>

          {/* Service */}
          <div className="space-y-6 animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.3s' }}>
            <h5 className="font-light text-xs tracking-[0.3em] uppercase text-background/60">
              Service
            </h5>
            <ul className="space-y-3 text-sm">
              <li><p className="text-background/60 font-light">Support 24/7</p></li>
              <li><p className="text-background/60 font-light">Garantie 30j</p></li>
              <li><p className="text-background/60 font-light">Livraison gratuite</p></li>
              <li><p className="text-background/60 font-light">Retours faciles</p></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6 animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.4s' }}>
            <h5 className="font-light text-xs tracking-[0.3em] uppercase text-background/60">
              Légal
            </h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-background/60 hover:text-background transition-colors font-light">Conditions</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors font-light">Politique</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors font-light">Retours</a></li>
              <li><a href="#" className="text-background/60 hover:text-background transition-colors font-light">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-background/20 to-transparent mb-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-xs animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.55s' }}>
          <p className="text-background/50 font-light tracking-widest">
            © 2024 PhoneSelect. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-background/50">
            <span className="font-light">🔒 100% Sécurisé</span>
            <span className="opacity-30">•</span>
            <span className="font-light">📦 Livraison Assurée</span>
            <span className="opacity-30">•</span>
            <span className="font-light">💬 Support 24/7</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
