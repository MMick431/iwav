'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Truck, Shield, CreditCard, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OrderSuccessModal } from './order-success-modal';

interface CheckoutFormProps {
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
}

type DeliveryType = 'standard' | 'express';

interface ConfirmationData {
  orderId: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  deliveryType: DeliveryType;
}

export function CheckoutForm({ items, total }: CheckoutFormProps) {
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('standard');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<ConfirmationData | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          deliveryType,
          items,
          total,
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la commande');

      const result = await response.json();

      setConfirmation({
        orderId: result.orderId,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerName: `${formData.firstName} ${formData.lastName}`,
        deliveryType,
      });

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
      });

    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR');
  };

  return (
    <>
      {confirmation && (
        <OrderSuccessModal
          isOpen={true}
          onClose={() => setConfirmation(null)}
          orderId={confirmation.orderId}
          customerName={confirmation.customerName}
          items={items}
          total={total}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Barre de progression responsive */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold">1</div>
              <span className="text-xs sm:text-sm mt-2">Panier</span>
            </div>
            <div className="flex-1 h-0.5 bg-primary/30 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm sm:text-base font-bold">2</div>
              <span className="text-xs sm:text-sm mt-2">Livraison</span>
            </div>
            <div className="flex-1 h-0.5 bg-primary/30 mx-2"></div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm sm:text-base font-bold">3</div>
              <span className="text-xs sm:text-sm mt-2">Paiement</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* FORMULAIRE - GAUCHE */}
          <div className="space-y-6 sm:space-y-8 animate-slideInLeft">
            
            {/* En-tête avec badge de sécurité */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold">Informations de livraison</h2>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-full">
                <Shield size={16} className="text-primary" />
                <span className="hidden sm:inline">Sécurisé</span>
              </div>
            </div>
            
            {/* Message livraison gratuite */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-full">
                <Truck size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm sm:text-base">Livraison gratuite</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Partout en France et en Afrique de l'Ouest</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              
              {/* Nom et Prénom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="peer w-full px-4 py-3 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-4 -top-2.5 bg-background px-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-muted-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-background peer-focus:text-primary">
                    Prénom
                  </label>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="peer w-full px-4 py-3 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-4 -top-2.5 bg-background px-2 text-xs text-muted-foreground transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-muted-foreground/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-background peer-focus:text-primary">
                    Nom
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              {/* Téléphone */}
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Phone size={18} className="text-muted-foreground" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="+229 XX XX XX XX"
                  required
                />
              </div>

              {/* Adresse */}
              <div className="relative">
                <div className="absolute left-4 top-4">
                  <MapPin size={18} className="text-muted-foreground" />
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full pl-12 pr-4 py-3 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Adresse complète"
                  required
                />
              </div>

              {/* Ville et Code postal */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Ville"
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="Code postal"
                    required
                  />
                </div>
              </div>

              {/* Options de livraison */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Truck size={20} className="text-primary" />
                  Mode de livraison
                </h3>

                <label className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  deliveryType === 'standard'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/30 hover:bg-muted/30'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={deliveryType === 'standard'}
                      onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Standard</span>
                        <span className="text-sm text-green-600 font-medium">Gratuite</span>
                      </div>
                      <p className="text-sm text-muted-foreground">7-10 jours ouvrés</p>
                    </div>
                  </div>
                </label>

                <label className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  deliveryType === 'express'
                    ? 'border-accent bg-accent/5'
                    : 'border-border hover:border-accent/30 hover:bg-muted/30'
                }`}>
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={deliveryType === 'express'}
                      onChange={(e) => setDeliveryType(e.target.value as DeliveryType)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Express</span>
                        <span className="text-sm text-accent font-medium">+5 000 FCFA</span>
                      </div>
                      <p className="text-sm text-muted-foreground">3-7 jours ouvrés - Prioritaire</p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Badges de paiement */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <img src="/visa.svg" alt="Visa" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                <img src="/orange-money.svg" alt="Orange Money" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                <img src="/mtn-money.svg" alt="MTN Money" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-6 sm:px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold text-base sm:text-lg hover:shadow-2xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Traitement en cours...</span>
                  </div>
                ) : (
                  `Confirmer la commande • ${formatPrice(total)} FCFA`
                )}
              </button>

              {/* Message sécurité */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield size={14} />
                <span>Paiement 100% sécurisé • Vos informations sont protégées</span>
              </div>
            </form>
          </div>

          {/* RÉSUMÉ - DROITE */}
          <div className="lg:sticky lg:top-24 h-fit animate-slideInRight">
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 lg:p-8 shadow-lg">
              
              {/* En-tête */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold">Récapitulatif</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock size={16} />
                  <span>{items.length} article{items.length > 1 ? 's' : ''}</span>
                </div>
              </div>

              {/* Liste des articles */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-semibold text-sm sm:text-base">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Quantité: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm sm:text-base">
                        {formatPrice(item.price * item.quantity)} FCFA
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatPrice(item.price)} FCFA/unité
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculs */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-medium">{formatPrice(total)} FCFA</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="font-medium text-green-600">
                    {deliveryType === 'express' ? '+5 000 FCFA' : 'Gratuite'}
                  </span>
                </div>

                <div className="flex justify-between text-base sm:text-lg font-bold pt-4 border-t border-border">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-xl sm:text-2xl">
                    {formatPrice(deliveryType === 'express' ? total + 5000 : total)} FCFA
                  </span>
                </div>
              </div>

              {/* Message de confirmation */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-xs sm:text-sm text-blue-900">
                  <span className="font-bold">📱 Confirmation :</span> Vous recevrez un message WhatsApp avec tous les détails de votre commande. Notre équipe vous contactera rapidement.
                </p>
              </div>

              {/* Garantie */}
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <Shield size={14} className="text-primary" />
                <span>Garantie 30 jours satisfait ou remboursé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}