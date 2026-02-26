# PhoneSelect - Guide d'Installation et Configuration

Bienvenue sur **PhoneSelect**, votre plateforme de vente de téléphones de seconde main premium avec un design professionnel et des animations époustouflantes!

## 🚀 Caractéristiques Principales

✅ **Design Ultra-Moderne** - Charte graphique violet/noir/blanc avec animations fluides  
✅ **Système de Commande Complet** - Panier, checkout, sélection de livraison  
✅ **Intégration WhatsApp & Email** - Confirmations automatiques aux clients  
✅ **Messages de Confirmation** - Notifications immédiates et professionnelles  
✅ **Options de Livraison** - Standard (7-10j) et Express (3-7j)  
✅ **Page Produits Attractive** - Galerie avec badges de condition  

## 📋 Configuration Initiale

### 1. Cloner/Installer le projet

```bash
npm install
# ou
pnpm install
```

### 2. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet:

```env
# Email Configuration (Resend recommandé)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@phoneselect.com

# WhatsApp Configuration (Twilio - optionnel)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=+1234567890

# Application URL
NEXT_PUBLIC_URL=http://localhost:3000
```

## 🔧 Configuration Email (Resend)

1. Allez sur [Resend.com](https://resend.com)
2. Créez un compte gratuit
3. Générez une API Key
4. Ajoutez-la à votre `.env.local`

**Alternative:** SendGrid, Mailgun, ou SMTP personnalisé

## 💬 Configuration WhatsApp

### Option 1: Twilio (Recommandé pour Production)
1. Créez un compte [Twilio](https://www.twilio.com)
2. Configurez WhatsApp Sandbox
3. Ajoutez les credentials à `.env.local`

### Option 2: WhatsApp Web (Développement)
Le système génère automatiquement des liens WhatsApp Web si Twilio n'est pas configuré:
- Les clients peuvent envoyer des messages directement
- Pas de frais

### Option 3: API WhatsApp Business
Contact direct avec Meta pour l'accès API WhatsApp Business

## 📧 Configuration Emails Personnalisés

Les emails de commande sont entièrement personnalisables dans `/lib/email-service.ts`:

```typescript
// Modifier le HTML du template client
export function generateCustomerOrderEmail(data) {
  // Votre HTML personnalisé ici
}
```

## 🛒 Ajouter des Produits

Modifiez `/components/products-section.tsx`:

```typescript
const products = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    brand: 'Apple',
    price: 599,
    image: 'https://your-image-url.jpg',
    condition: 'Excellent',
    battery: '85%',
    storage: '256GB'
  },
  // Ajoutez plus de produits...
];
```

## 📞 Configurer vos Contacts

Modifiez vos informations dans:
- **Footer** (`/components/footer.tsx`) - Numéro WhatsApp et Email
- **API Orders** (`/app/api/orders/route.ts`) - Numéro admin WhatsApp
- **Variables .env** - Email principal

Vos infos actuelles:
- 📱 WhatsApp: +2290192338598
- 📧 Email: michaelhologan45@gmail.com

## 🎨 Personnaliser les Couleurs

Modifiez `/app/globals.css` pour changer le thème:

```css
:root {
  --primary: oklch(0.6 0.16 292.4); /* Violet principal */
  --secondary: oklch(0.15 0 0); /* Noir */
  --accent: oklch(0.65 0.17 292.4); /* Accent violet */
}
```

## 🔄 Workflow Commandes

```
Client visite site
        ↓
Sélectionne produit
        ↓
Va au checkout
        ↓
Remplit formulaire + Choisit livraison
        ↓
Clique "Confirmer la Commande"
        ↓
API déclenche:
  ├─ Email de confirmation client (Resend/SendGrid)
  ├─ Message WhatsApp client (Twilio/Web)
  ├─ Email notification admin
  └─ Message WhatsApp admin
        ↓
Modal de confirmation affichée au client
        ↓
Admin contacte client pour confirmer
        ↓
Livraison et suivi
```

## 🚀 Déployer sur Vercel

1. Poussez votre code sur GitHub
2. Connectez votre repo à [Vercel](https://vercel.com)
3. Ajoutez les variables d'environnement dans Vercel Dashboard
4. Déployez!

```bash
# Ou via CLI
vercel deploy
```

## 📧 Structure des Messages

### Message de Confirmation Client (WhatsApp)
```
✅ Merci [Nom]!
Votre commande a été bien reçue.

📦 Numéro de Commande: #ORD-XXXXX
⏱️ Livraison Estimée: 7-10 jours
```

### Email de Confirmation Client
- Numéro de commande
- Détails produits
- Total et frais
- Adresse de livraison
- Informations de contact

### Notification Admin (WhatsApp)
- Informations complètes client
- Détails produits
- Total commande
- Mode livraison

## 🔒 Sécurité

- ✅ Validation des formulaires côté client ET serveur
- ✅ Pas d'exposition des credentials
- ✅ API routes protégées
- ✅ HTTPS recommandé
- ✅ RLS (Row Level Security) si base de données

## 🐛 Troubleshooting

### Les emails ne s'envoient pas
1. Vérifiez la clé API Resend
2. Vérifiez que EMAIL_FROM est correct
3. Consultez les logs: `vercel logs`

### WhatsApp ne fonctionne pas
1. Si Twilio: Vérifiez les credentials
2. Sinon: Les liens WhatsApp Web seront générés (dev)
3. Testez le lien manuellement

### Les animations sont saccadées
1. Vérifiez les performances (DevTools)
2. Réduisez les animations en `.env.local`:
```env
NEXT_PUBLIC_REDUCED_MOTION=true
```

## 📱 Responsive Design

Le site est 100% responsive:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🎯 Prochaines Améliorations

- [ ] Panier persistant (localStorage/DB)
- [ ] Système de paiement (Stripe)
- [ ] Page détail produit
- [ ] Système de filtrage
- [ ] Dashboard admin
- [ ] Historique commandes client
- [ ] Intégration SMS (pour confirmation)
- [ ] Chatbot WhatsApp

## 📞 Support

Pour toute question:
- 📧 Email: michaelhologan45@gmail.com
- 💬 WhatsApp: +2290192338598

---

**Créé avec ❤️ par PhoneSelect | Téléphones de Seconde Main Premium**
