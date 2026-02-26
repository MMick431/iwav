'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Search, CheckCircle, Truck, Clock } from 'lucide-react';

export default function OrderStatusPage() {
  const [orderId, setOrderId] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchPerformed(true);
  };

  const mockOrderData = {
    id: 'ORD-1234567890-ABC123',
    status: 'in_progress',
    date: new Date(Date.now() - 86400000).toLocaleDateString('fr-FR'),
    estimatedDelivery: new Date(Date.now() + 604800000).toLocaleDateString('fr-FR'),
    items: [
      { name: 'iPhone 13 Pro', quantity: 1, price: 599 }
    ],
    total: 599,
    shipping: {
      address: '123 Rue de la Paix, 75000 Paris',
      type: 'Standard',
      carrier: 'DHL',
      trackingNumber: 'TRACKING123456'
    }
  };

  const steps = [
    { status: 'confirmed', label: 'Commande Confirmée', completed: true },
    { status: 'processing', label: 'En Préparation', completed: true },
    { status: 'shipped', label: 'Expédiée', completed: false },
    { status: 'delivered', label: 'Livrée', completed: false },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      <div className="flex-1 pt-32 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Suivi de <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Commande</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entrez votre numéro de commande pour suivre l'état de votre livraison.
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-12 animate-slideInUp">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 border border-border rounded-lg bg-card focus-within:ring-2 focus-within:ring-primary transition-all">
                <Search size={20} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ORD-XXXXXXXXX"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="flex-1 outline-none bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                Chercher
              </button>
            </div>
          </form>

          {/* Order Details */}
          {searchPerformed && (
            <div className="max-w-3xl mx-auto space-y-8 animate-fadeInUp">
              {/* Order Status */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Numéro de Commande</p>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">#{mockOrderData.id}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Commande Passée</p>
                    <p className="text-lg font-semibold">{mockOrderData.date}</p>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-6">
                    {steps.map((step, index) => (
                      <div key={step.status} className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all ${
                          step.completed
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-border text-muted-foreground'
                        }`}>
                          {step.completed ? (
                            <CheckCircle size={24} />
                          ) : (
                            <Clock size={24} />
                          )}
                        </div>
                        <p className={`text-xs md:text-sm text-center font-semibold ${
                          step.completed ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-border rounded-full overflow-hidden mt-4">
                    <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Delivery Address */}
                <div className="bg-card border border-border rounded-2xl p-6 hover-lift">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Truck size={20} className="text-primary" />
                    Adresse de Livraison
                  </h3>
                  <p className="text-muted-foreground">{mockOrderData.shipping.address}</p>
                </div>

                {/* Tracking Info */}
                <div className="bg-card border border-border rounded-2xl p-6 hover-lift">
                  <h3 className="font-bold mb-4">Informations de Suivi</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Type de Livraison</p>
                      <p className="font-semibold">{mockOrderData.shipping.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Transporteur</p>
                      <p className="font-semibold">{mockOrderData.shipping.carrier}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Numéro de Suivi</p>
                      <p className="font-mono font-semibold text-primary">{mockOrderData.shipping.trackingNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-bold mb-4">Résumé de Commande</h3>
                <div className="space-y-3 pb-4 border-b border-border">
                  {mockOrderData.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-lg font-bold">
                  <span>Total</span>
                  <span className="gradient-text">${mockOrderData.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <p className="text-sm text-green-700 mb-2">Livraison Estimée</p>
                <p className="text-2xl font-bold text-green-900">{mockOrderData.estimatedDelivery}</p>
              </div>

              {/* Support Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                <p className="text-blue-900">
                  Des questions sur votre commande? Contactez-nous via{' '}
                  <a href="https://wa.me/2290192338598" className="font-bold hover:underline">WhatsApp</a> ou{' '}
                  <a href="mailto:michaelhologan45@gmail.com" className="font-bold hover:underline">Email</a>
                </p>
              </div>
            </div>
          )}

          {/* No Search Message */}
          {!searchPerformed && (
            <div className="max-w-2xl mx-auto text-center text-muted-foreground animate-fadeInUp">
              <p className="text-lg">Entrez votre numéro de commande pour commencer le suivi</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
