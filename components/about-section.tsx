export function AboutSection() {
  return (
    <section id="about" className="relative w-full bg-background py-40 border-t border-foreground/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-parallaxShift" />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          {/* Left Content */}
          <div className="space-y-12">
            <div className="space-y-6 overflow-hidden">
              <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase font-light animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.1s' }}>
                Notre Mission
              </p>
              <h2 className="text-8xl font-light leading-tight animate-textReveal opacity-0" style={{ animationDelay: '0.2s' }}>
                <span className="block">Qualité</span>
                <span className="block text-primary">Garantie</span>
              </h2>
            </div>

            <div className="space-y-6 animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.35s' }}>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Chaque téléphone chez PhoneSelect passe par un processus d'inspection rigoureux. Nous ne venons pas simplement des appareils d'occasion — nous livrons des appareils vérifiés et garantis.
              </p>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Nos experts testent chaque fonction, vérifiez la batterie, nettoyez et finalisent chaque appareil avant qu'il n'atteigne votre porte. Votre satisfaction est notre priorité absolue.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-foreground/10 animate-slideInFromLeft opacity-0" style={{ animationDelay: '0.5s' }}>
              <div className="space-y-2">
                <p className="text-5xl font-light">10k+</p>
                <p className="text-xs tracking-widest text-muted-foreground uppercase font-light">Clients heureux</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-light">100%</p>
                <p className="text-xs tracking-widest text-muted-foreground uppercase font-light">Garantie</p>
              </div>
            </div>
          </div>

          {/* Right - Process */}
          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Acquisition',
                desc: 'Sélection soigneuse d\'appareils premium de seconde main',
                icon: '📱'
              },
              {
                step: '02',
                title: 'Inspection',
                desc: 'Test complet et diagnostic approfondi de chaque fonction',
                icon: '🔍'
              },
              {
                step: '03',
                title: 'Nettoyage',
                desc: 'Nettoyage professionnel et préparation pour l\'expédition',
                icon: '✨'
              },
              {
                step: '04',
                title: 'Livraison',
                desc: 'Expédition sécurisée avec suivi à votre adresse',
                icon: '🚚'
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group border border-foreground/10 p-8 hover:border-primary/50 hover:bg-foreground/2 transition-all duration-500 animate-revealUp opacity-0"
                style={{ animationDelay: `${0.15 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-2">
                    <p className="text-sm tracking-widest text-muted-foreground uppercase font-light">{item.title}</p>
                    <p className="text-5xl font-light text-primary/20">{item.step}</p>
                  </div>
                  <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">{item.icon}</span>
                </div>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
