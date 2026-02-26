'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour fermer le menu mobile
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="w-full border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo + iWAV */}
        <Link href="/" className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Image 
            src="/logo.png"
            alt="iWAV" 
            width={40} 
            height={40}
            className="w-auto h-8"
          />
          iWAV
        </Link>

        {/* Navigation desktop - AVEC LES NOUVEAUX BOUTONS */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm tracking-wide hover:text-primary transition-colors duration-300"
          >
            Accueil
          </Link>
          <Link 
            href="#iphones" 
            className="text-sm tracking-wide hover:text-primary transition-colors duration-300"
          >
            iPhones disponibles
          </Link>
          <Link 
            href="#about" 
            className="text-sm tracking-wide hover:text-primary transition-colors duration-300"
          >
            À propos
          </Link>
          <Link 
            href="#delivery" 
            className="text-sm tracking-wide hover:text-primary transition-colors duration-300"
          >
            Livraison
          </Link>
          <Link 
            href="/checkout" 
            className="px-6 py-2 bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity duration-300"
          >
            Commande
          </Link>
        </nav>

        {/* Bouton menu mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile - AVEC LES NOUVEAUX BOUTONS */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col gap-6">
            <Link href="/" className="text-sm tracking-wide" onClick={closeMenu}>
              Accueil
            </Link>
            <Link href="#iphones" className="text-sm tracking-wide" onClick={closeMenu}>
              iPhones disponibles
            </Link>
            <Link href="#about" className="text-sm tracking-wide" onClick={closeMenu}>
              À propos
            </Link>
            <Link href="#delivery" className="text-sm tracking-wide" onClick={closeMenu}>
              Livraison
            </Link>
            <Link href="/checkout" className="px-6 py-2 bg-foreground text-background text-sm font-medium w-fit" onClick={closeMenu}>
              Commande
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}