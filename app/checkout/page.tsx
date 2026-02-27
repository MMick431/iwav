import { Suspense } from 'react';
import CheckoutContent from './CheckoutContent';

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Chargement de votre commande...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}