'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CheckoutForm } from '@/components/checkout-form';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

// Liste des produits
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
    price: 220000,
    condition: 'Très bon état',
    specs: '512GB - Noir',
    image: '/16-simple.jpg',
  },
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setQuantity(1); // Réinitialiser la quantité à 1 quand on change de produit
      }
    }
  }, [productId]);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Si aucun produit n'est sélectionné
  if (!selectedProduct) {
    return (
      <main className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="py-20 text-center">
          <h1 className="text-3xl mb-4">Aucun produit sélectionné</h1>
          <p className="text-muted-foreground mb-8">Veuillez choisir un iPhone depuis la page d'accueil.</p>
          <a href="/" className="px-8 py-4 bg-foreground text-background inline-block">
            Retour à l'accueil
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  // Créer un tableau cartItems avec le produit sélectionné et la quantité
  const cartItems = [
    {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: quantity
    }
  ];

  const total = selectedProduct.price * quantity;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <p className="text-sm tracking-widest text-muted-foreground mb-4 uppercase">
              Commande
            </p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Finalisez votre achat
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Vous commandez : <span className="text-foreground font-semibold">{selectedProduct.name}</span> - {selectedProduct.specs}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Formulaire de livraison */}
            <div>
              <CheckoutForm items={cartItems} total={total} />
            </div>

            {/* Résumé de commande avec quantité */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card border border-foreground/10 p-8">
                <h2 className="text-2xl font-light mb-8">Résumé de Commande</h2>

                {/* Produit sélectionné */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-foreground/10">
                  <div className="relative h-20 w-20 bg-muted flex-shrink-0">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{selectedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedProduct.specs}</p>
                    <p className="text-sm text-muted-foreground">{selectedProduct.condition}</p>
                  </div>
                  <p className="font-medium">{selectedProduct.price.toLocaleString()} FCFA</p>
                </div>

                {/* Sélecteur de quantité */}
                <div className="mb-6 pb-6 border-b border-foreground/10">
                  <p className="text-sm text-muted-foreground mb-3">Quantité</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={decreaseQuantity}
                      className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-xl font-light w-12 text-center">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground/5 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Détails des prix */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Prix unitaire</span>
                    <span>{selectedProduct.price.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantité</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Livraison</span>
                    <span>Incluse</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-xl font-medium pt-6 border-t border-foreground/10 mb-8">
                  <span>Total</span>
                  <span className="text-primary">{total.toLocaleString()} FCFA</span>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  Vous recevrez un message WhatsApp ou Email confirmant votre commande.
                </p>

                <button className="w-full mt-6 px-8 py-4 bg-foreground text-background text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-all">
                  Confirmer la commande ({quantity} {quantity > 1 ? 'articles' : 'article'})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}