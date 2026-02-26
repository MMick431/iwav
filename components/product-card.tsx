'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  condition: string;
  specs: string;
  image: string;
}

export function ProductCard({ id, name, price, condition, specs, image }: ProductCardProps) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Image Container - Responsive */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={false}
        />
        
        {/* Overlay gradient au hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Badge condition - repositionné pour mobile */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-primary text-primary-foreground px-2 sm:px-4 py-1 sm:py-2 text-[10px] sm:text-xs rounded-full font-medium shadow-lg">
          {condition}
        </div>
      </div>

      {/* Contenu - padding adaptatif */}
      <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
        {/* En-tête */}
        <div className="space-y-1 sm:space-y-2">
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-muted-foreground uppercase font-light">
            Occasion Premium
          </p>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight group-hover:text-primary transition-colors duration-500 line-clamp-1">
            {name}
          </h3>
        </div>

        {/* Spécifications */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {specs}
        </p>

        {/* Prix et bouton */}
        <div className="pt-4 sm:pt-5 lg:pt-6 border-t border-border flex items-end justify-between">
          <div>
            <p className="text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase mb-1">
              Prix
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
              {price.toLocaleString()} FCFA
            </p>
          </div>
          
          <Link 
            href={`/checkout?product=${id}`}
            className="px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-primary text-primary-foreground text-xs sm:text-sm font-medium rounded-lg hover:shadow-lg hover:scale-105 hover:bg-primary/90 transition-all duration-300 whitespace-nowrap"
          >
            Acheter
          </Link>
        </div>
      </div>
    </div>
  );
}