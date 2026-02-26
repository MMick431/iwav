'use client';

import { useEffect } from 'react';
import { CheckCircle, Package, Truck, Mail, Phone, MessageCircle, X } from 'lucide-react';
import Link from 'next/link';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
}

export function OrderSuccessModal({ isOpen, onClose, orderId, customerName, items, total }: OrderSuccessModalProps) {
  // Empêcher le scroll en arrière-plan quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatPrice = (price: number) => price.toLocaleString('fr-FR');

  const whatsappNumber = process.env.NEXT_PUBLIC_ADMIN_PHONE || '+2290192338598';
  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis ${customerName} et je souhaite suivre ma commande #${orderId}`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-gradient-to-br from-background to-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border relative animate-slideUp my-4">
        
        {/* Bouton fermer - repositionné pour mobile */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 hover:bg-muted rounded-full transition-colors z-10 bg-background/80 backdrop-blur-sm"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Header avec succès - plus compact sur mobile */}
        <div className="text-center p-6 sm:p-8 border-b border-border">
          <div className="inline-flex p-3 sm:p-4 bg-green-100 rounded-full mb-3 sm:mb-4">
            <CheckCircle size={36} className="sm:size-48 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Commande confirmée ! 🎉
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Merci {customerName} d'avoir choisi iWAV
          </p>
        </div>

        {/* Contenu - avec padding ajusté pour mobile */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          {/* Numéro de commande */}
          <div className="bg-primary/5 p-3 sm:p-4 rounded-lg text-center">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Numéro de commande</p>
            <p className="text-lg sm:text-2xl font-mono font-bold text-primary break-all">{orderId}</p>
          </div>

          {/* Résumé rapide */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
              <Package size={18} className="sm:size-20 text-primary" />
              Récapitulatif
            </h3>
            <div className="bg-muted/30 p-3 sm:p-4 rounded-lg">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs sm:text-sm py-2 border-b border-border/50 last:border-0">
                  <span className="font-medium">{item.name} x{item.quantity}</span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)} FCFA</span>
                </div>
              ))}
              <div className="flex justify-between font-bold pt-2 mt-2 border-t border-border">
                <span className="text-sm sm:text-base">Total</span>
                <span className="text-primary text-sm sm:text-base">{formatPrice(total)} FCFA</span>
              </div>
            </div>
          </div>

          {/* Timeline de livraison - plus compact */}
          <div className="bg-muted/30 p-3 sm:p-4 rounded-lg">
            <h3 className="font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
              <Truck size={18} className="sm:size-20 text-primary" />
              Prochaines étapes
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle size={12} className="sm:size-14 text-white" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">Commande reçue</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Nous avons bien reçu votre commande</p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={12} className="sm:size-14 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">Confirmation par email</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Un email récapitulatif vous a été envoyé</p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={12} className="sm:size-14 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base">Contact WhatsApp</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Vous serez contacté sous 24h pour finaliser</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message rassurant - plus compact */}
          <div className="bg-blue-50 border border-blue-200 p-3 sm:p-4 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-900">
              <span className="font-bold">À savoir :</span> Notre équipe vous contactera rapidement via WhatsApp 
              pour confirmer les détails de livraison et finaliser votre commande.
            </p>
          </div>

          {/* Actions - boutons plus petits sur mobile */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
            <Link
              href={whatsappLink}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-sm sm:text-base transition-colors"
            >
              <MessageCircle size={18} className="sm:size-20" />
              <span className="whitespace-nowrap">WhatsApp</span>
            </Link>
            <Link
              href="/"
              onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium text-sm sm:text-base transition-colors"
            >
              Accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}