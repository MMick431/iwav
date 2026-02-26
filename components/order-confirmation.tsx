'use client';

import { useEffect, useState } from 'react';
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      // Auto-hide after 10 seconds? Non, on laisse l'utilisateur fermer
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatPrice = (price: number) => price.toLocaleString('fr-FR');

  const whatsappNumber = process.env.NEXT_PUBLIC_ADMIN_PHONE || '+2290192338598';
  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis ${customerName} et je souhaite suivre ma commande #${orderId}`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-background to-card rounded-2xl max-w-2xl w-full shadow-2xl border border-border relative animate-slideUp">
        
        {/* Bouton fermer */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header avec succès */}
        <div className="text-center p-8 border-b border-border">
          <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Commande confirmée ! 🎉
          </h2>
          <p className="text-muted-foreground">
            Merci {customerName} d'avoir choisi iWAV
          </p>
        </div>

        {/* Contenu */}
        <div className="p-8 space-y-6">
          {/* Numéro de commande */}
          <div className="bg-primary/5 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-1">Numéro de commande</p>
            <p className="text-2xl font-mono font-bold text-primary">{orderId}</p>
          </div>

          {/* Résumé rapide */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Package size={20} className="text-primary" />
              Récapitulatif
            </h3>
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)} FCFA</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total)} FCFA</span>
            </div>
          </div>

          {/* Timeline de livraison */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Truck size={20} className="text-primary" />
              Prochaines étapes
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle size={14} className="text-white" />
                </div>
                <div>
                  <p className="font-medium">Commande reçue</p>
                  <p className="text-sm text-muted-foreground">Nous avons bien reçu votre commande</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail size={14} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Confirmation par email</p>
                  <p className="text-sm text-muted-foreground">Un email récapitulatif vous a été envoyé</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={14} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium">Contact WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Vous serez contacté sous 24h pour finaliser</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message rassurant */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-sm text-blue-900">
              <span className="font-bold">À savoir :</span> Notre équipe vous contactera rapidement via WhatsApp 
              pour confirmer les détails de livraison et finaliser votre commande. Vous pouvez aussi nous contacter 
              directement si vous avez des questions.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              href={whatsappLink}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <MessageCircle size={20} />
              Contacter via WhatsApp
            </Link>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}