# 🚀 Guide de Déploiement - PhoneSelect

Ce guide vous aide à déployer PhoneSelect sur Vercel avec toutes les intégrations.

## 📋 Prérequis

- ✅ Code GitHub pushé
- ✅ Compte Vercel ([vercel.com](https://vercel.com))
- ✅ API Key Resend ([resend.com](https://resend.com))
- ✅ Optionnel: Twilio pour WhatsApp ([twilio.com](https://twilio.com))

## 🎯 Étapes de Déploiement

### 1️⃣ Importer le Projet sur Vercel

1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquez "New Project"
3. Sélectionnez votre repo GitHub
4. Cliquez "Import"

### 2️⃣ Configurer les Variables d'Environnement

Pendant l'import, allez à **Environment Variables** et ajoutez:

```
RESEND_API_KEY = your_resend_api_key_here
EMAIL_FROM = noreply@phoneselect.com
NEXT_PUBLIC_URL = https://votre-domaine.com
NEXT_PUBLIC_ADMIN_PHONE = +2290192338598
NEXT_PUBLIC_ADMIN_EMAIL = michaelhologan45@gmail.com

# Optionnel - Twilio
TWILIO_ACCOUNT_SID = your_account_sid
TWILIO_AUTH_TOKEN = your_auth_token
TWILIO_WHATSAPP_NUMBER = +1234567890
```

### 3️⃣ Configuration Resend (Emails)

#### Obtenir votre API Key

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte (gratuit)
3. Allez dans **Integrations → API Keys**
4. Générez une nouvelle clé
5. Copiez-la dans `RESEND_API_KEY` sur Vercel

#### Configurer le domaine

Pour éviter le spam:
1. Allez dans **Domains**
2. Ajoutez votre domaine
3. Suivez les instructions DNS
4. Une fois vérifié, utilisez-le pour `EMAIL_FROM`

**Important:** Sans domaine vérifié, les emails peuvent aller en spam.

### 4️⃣ Configuration Twilio (WhatsApp - Optionnel)

#### Pour développement (Sandbox)

1. Créez un compte [Twilio](https://www.twilio.com)
2. Allez dans **WhatsApp → Sandbox**
3. Scannez le QR code avec WhatsApp
4. Envoyez le message demandé
5. Copiez: Account SID, Auth Token, WhatsApp Number
6. Ajoutez à `.env.local` et Vercel

#### Pour production

1. Passez à WhatsApp Business Account
2. Demande d'accès API de Meta
3. Configurez les credentials
4. Plus d'infos: [docs.twilio.com/whatsapp](https://docs.twilio.com/whatsapp)

### 5️⃣ Déployer le Projet

1. Vérifiez les variables d'env
2. Cliquez "Deploy"
3. Attendez ~3-5 minutes
4. Une fois terminé, cliquez "Visit"

## ✅ Vérifier le Déploiement

### Test Email

1. Allez sur votre site
2. Passez une commande de test
3. Vérifiez que vous avez reçu l'email
4. Vérifiez que l'admin a reçu l'email

### Test WhatsApp

1. Passez une commande avec votre numéro
2. Vous devriez recevoir un message WhatsApp
3. Si pas d'API: un lien Web s'affichera

### Vérifier les Logs

```bash
# Affiche les logs de production
vercel logs

# Logs temps réel
vercel logs -f
```

## 🔗 Configurer un Domaine Custom

1. Allez dans **Settings → Domains**
2. Ajoutez votre domaine
3. Suivez les instructions DNS
4. Mettez à jour `NEXT_PUBLIC_URL`

## 🔄 Mise à Jour du Projet

### Via Git

```bash
# Commitez vos changements
git add .
git commit -m "Mise à jour PhoneSelect"
git push origin main

# Vercel redéploie automatiquement
```

### Via CLI Vercel

```bash
# Installez Vercel CLI
npm i -g vercel

# Déployez
vercel deploy

# Production
vercel deploy --prod
```

## 🛡️ Sécurité

### Checklist

- ✅ Jamais commitez `.env.local` (l'ajouter à `.gitignore`)
- ✅ Utilisez des variables sensibles uniquement côté serveur
- ✅ Activez les domains verifiés pour Resend
- ✅ Changez les credentials régulièrement
- ✅ Utilisez HTTPS (automatique sur Vercel)

### Protection API

Considérez l'ajout de:
- Rate limiting sur `/api/orders`
- Validation CSRF
- API Keys pour les webhooks

## 📊 Monitoring

### Vercel Analytics

1. Allez dans **Analytics**
2. Voyez:
   - Performance
   - Core Web Vitals
   - Utilisateurs
   - Erreurs

### Erreurs Email

1. Consultez les logs: `vercel logs`
2. Vérifiez la clé API Resend
3. Vérifiez le domaine est vérifié
4. Testez avec un email différent

### Erreurs WhatsApp

1. Si Twilio: vérifiez credentials
2. Si Web: testez le lien WhatsApp manuellement
3. Consultez les logs Twilio

## 🚨 Troubleshooting

### Les emails n'arrivent pas

```bash
# Vérifier les logs
vercel logs | grep -i email

# Solutions
1. Vérifier RESEND_API_KEY
2. Vérifier domaine Resend est validé
3. Vérifier EMAIL_FROM est correct
4. Réessayer dans 5 minutes
```

### WhatsApp ne fonctionne pas

```bash
# Si Twilio n'est pas configuré:
→ Les liens WhatsApp Web seront générés automatiquement

# Si Twilio est configuré:
1. Vérifier TWILIO_ACCOUNT_SID
2. Vérifier TWILIO_AUTH_TOKEN
3. Vérifier TWILIO_WHATSAPP_NUMBER
4. Vérifier le numéro client au format +[pays][numéro]
```

### Le site est lent

1. Consultez Vercel Analytics
2. Optimisez les images
3. Vérifiez les Core Web Vitals
4. Contactez support Vercel

## 🔄 CI/CD

Vercel configure automatiquement:

- ✅ Tests à chaque push
- ✅ Preview deployments (branches)
- ✅ Production deployment (main)
- ✅ Rollback automatique si erreur

## 📞 Support

### Problèmes Vercel
- Email: support@vercel.com
- Docs: [vercel.com/docs](https://vercel.com/docs)

### Problèmes Resend
- Docs: [resend.com/docs](https://resend.com/docs)
- Email: support@resend.com

### Problèmes Twilio
- Docs: [twilio.com/docs](https://twilio.com/docs)
- Support: [support.twilio.com](https://support.twilio.com)

## 💡 Tips & Tricks

### Redéployer rapidement

```bash
vercel --prod
```

### Vérifier les variables d'env

```bash
vercel env pull .env.local.vercel
```

### Cloner une production en staging

```bash
vercel clone --prod
```

### Voir toutes les deployments

```bash
vercel list
```

## 🎉 Succès!

Une fois déployé:

1. ✅ Le site est en ligne
2. ✅ Les commandes arrivent par email
3. ✅ Les confirmations vont sur WhatsApp
4. ✅ L'admin reçoit les notifications
5. ✅ Les clients peuvent suivre leurs commandes

**Profitez de vos ventes de téléphones!** 📱
