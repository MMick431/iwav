# 🧪 Guide de Test - PhoneSelect

Guide complet pour tester toutes les fonctionnalités de votre site.

## 🎯 Tests Locaux

### 1. Démarrer le serveur
```bash
pnpm dev
```

### 2. Accéder au site
```
http://localhost:3000
```

## 🧬 Tests Fonctionnels

### Test 1: Navigation
- [ ] Cliquez sur "PhoneSelect" logo
- [ ] Cliquez sur les liens header (Téléphones, À propos, Livraison, Contact)
- [ ] Testez le menu mobile (< 768px)
- [ ] Vérifiez les animations au scroll

### Test 2: Section Héros
- [ ] Lisez le message "Téléphones de Seconde Main - 100% Fiables"
- [ ] Cliquez "Voir la Collection"
- [ ] Vérifiez le scroll vers les produits
- [ ] Observez les animations

### Test 3: Catalogue Produits
- [ ] Vérifiez que les 6 produits s'affichent
- [ ] Vérifiez les prix, modèles, conditions
- [ ] Passez la souris sur une carte (hover effect)
- [ ] Cliquez sur une carte (doit ouvrir page produit - TODO)

### Test 4: Important Notice
- [ ] Lisez la section jaune "Téléphones de Seconde Main"
- [ ] Vérifiez que c'est bien visible

### Test 5: Options Livraison
- [ ] Vérifiez Standard (7-10 jours)
- [ ] Vérifiez Express (3-7 jours)
- [ ] Lisez le badge "POPULAIRE" sur Express
- [ ] Vérifiez la timeline des étapes (1→2→3→4)

### Test 6: Témoignages
- [ ] Vérifiez les 3 témoignages
- [ ] Vérifiez les étoiles (5 étoiles)
- [ ] Vérifiez les avatars
- [ ] Lisez les avis

### Test 7: Footer
- [ ] Cliquez sur le lien WhatsApp (doit ouvrir WhatsApp)
- [ ] Cliquez sur le lien Email (doit ouvrir mail)
- [ ] Vérifiez les liens rapides

## 🛒 Test Checkout

### Prérequis
- Avoir `.env.local` configuré OU accepter les logs

### Test 1: Accès Checkout
- [ ] Allez à `/checkout`
- [ ] Vérifiez le formulaire s'affiche
- [ ] Vérifiez le résumé commande à droite

### Test 2: Validation Formulaire
- [ ] Laissez les champs vides
- [ ] Cliquez "Confirmer la Commande"
- [ ] Vérifiez les messages d'erreur

### Test 3: Remplissage Formulaire
Remplissez avec:
```
Prénom: Jean
Nom: Dupont
Email: jean@example.com
Téléphone: +2290191234567
Adresse: 123 Rue de la Paix
Ville: Cotonou
Code Postal: 00229
```

### Test 4: Choix Livraison
- [ ] Cliquez radio "Standard"
- [ ] Vérifiez le style se met à jour
- [ ] Cliquez radio "Express"
- [ ] Vérifiez le changement

### Test 5: Soumission
- [ ] Cliquez "Confirmer la Commande"
- [ ] Vérifiez le modal de confirmation s'affiche
- [ ] Vérifiez le numéro de commande

### Test 6: Modal Confirmation
- [ ] Vérifiez la checkmark animation
- [ ] Lisez "Commande Reçue!"
- [ ] Vérifiez numéro de commande
- [ ] Vérifiez l'email et WhatsApp affichés
- [ ] Vérifiez les 5 étapes (1-5)
- [ ] Cliquez "Retour à l'Accueil"
- [ ] Vérifiez redirection

## 📧 Tests Email

### Si Resend est configuré:

1. **Avant de soumettre la commande:**
   - Créez un compte Resend
   - Générez une clé API
   - Ajoutez à `.env.local`: `RESEND_API_KEY=re_xxx...`
   - Redémarrez le serveur

2. **Après soumission:**
   - Allez à votre boîte email
   - Vérifiez le reçu d'une confirmation
   - Ouvrez l'email et vérifiez:
     - [ ] Numéro de commande
     - [ ] Liste des produits
     - [ ] Adresse de livraison
     - [ ] Mode livraison
     - [ ] Message professionnel

3. **Email Admin:**
   - Allez à l'email admin (michaelhologan45@gmail.com)
   - Vérifiez avoir reçu notification
   - Vérifiez les infos client complètes

### Si Resend n'est pas configuré:
- Vérifiez les logs console
- Attendez l'implémentation manuelle

## 💬 Tests WhatsApp

### Avec Twilio:

1. **Avant de soumettre:**
   - Configurez Twilio (voir DEPLOYMENT.md)
   - Ajoutez credentials à `.env.local`
   - Redémarrez

2. **Après soumission:**
   - Attendez 2-3 secondes
   - Vérifiez le message WhatsApp
   - Message doit avoir:
     - [ ] "✅ Merci [Prénom]!"
     - [ ] Numéro de commande
     - [ ] Temps de livraison

### Avec WhatsApp Web (Développement):

1. **Après soumission:**
   - Un lien WhatsApp sera affiché
   - Cliquez le lien
   - WhatsApp s'ouvre automatiquement
   - Vérifiez le message est pré-rempli
   - Vous pouvez envoyer manuellement

## 🎨 Tests Design

### Couleurs
- [ ] Vérifiez violet principal (#9333ea)
- [ ] Vérifiez noir (#1a1a1a)
- [ ] Vérifiez blanc cassé (#fafafa)
- [ ] Vérifiez les accents violets

### Animations
- [ ] Rechargez la page
- [ ] Vérifiez fadeInUp sur le titre
- [ ] Scrollez vers bas
- [ ] Vérifiez slideInLeft/Right sur sections
- [ ] Passez la souris sur boutons (hover-lift)
- [ ] Vérifiez glowPulse sur badges

### Responsive
- [ ] Testez sur mobile (< 640px)
- [ ] Testez sur tablet (640px - 1024px)
- [ ] Testez sur desktop (> 1024px)
- [ ] Vérifiez menu responsive
- [ ] Vérifiez grille produits responsive

### Accessibilité
- [ ] Vérifiez les alt text sur images
- [ ] Testez au clavier (Tab, Enter)
- [ ] Vérifiez le contraste des couleurs
- [ ] Testez avec un lecteur d'écran (NVDA, JAWS)

## 📱 Test Page Suivi

1. Allez à `/order-status`
2. Entrez un numéro (ex: ORD-1234567890-ABC123)
3. Cliquez "Chercher"
4. Vérifiez:
   - [ ] Numéro commande s'affiche
   - [ ] Timeline progresse à 50%
   - [ ] Infos livraison présentes
   - [ ] Adresse correcte
   - [ ] Estimation de livraison

## 🚀 Performance

### Desktop (Chrome DevTools)
```bash
# Audit
1. F12 → Lighthouse
2. Cliquez "Analyze page load"
3. Vérifiez:
   - Performance > 90
   - Accessibility > 90
   - Best Practices > 90
   - SEO > 90
```

### Mobile
```bash
# Émulation mobile
1. F12 → Device Toolbar (Ctrl+Shift+M)
2. Sélectionnez "iPhone 12 Pro"
3. Testez la navigation
4. Vérifiez les performances
```

## 🧪 Tests Manuels Checklist

### Avant Déploiement

#### Desktop
- [ ] Accueil: Tous les éléments visibles
- [ ] Hover effects fonctionnent
- [ ] Formulaire validation OK
- [ ] Confirmation modal s'affiche
- [ ] Animations fluides
- [ ] Footer liens fonctionnent

#### Mobile
- [ ] Menu responsive s'ouvre/ferme
- [ ] Texte lisible (> 16px)
- [ ] Boutons cliquables (> 44px)
- [ ] Pas de scroll horizontal
- [ ] Formulaire usable au tactile

#### Email
- [ ] Confirmation reçue
- [ ] HTML bien rendu
- [ ] Lien "Contacter" fonctionne

#### WhatsApp
- [ ] Message reçu
- [ ] Format correct
- [ ] Lien cliquable

## 🐛 Debugging

### Voir les logs
```bash
# Console navigateur
F12 → Console tab
```

### Network requests
```bash
# Network tab
F12 → Network tab
Soumettre commande
Voir POST /api/orders
Vérifier Response 200
```

### Email logs
```bash
# Voir les logs d'email
Console → chercher "Email to"
```

### WhatsApp logs
```bash
# Voir les logs WhatsApp
Console → chercher "WhatsApp to"
```

## 📊 Cas de Test Extremes

### Données Invalides
```
Email invalide: "notanemail"
Téléphone: "123" (trop court)
Code postal: "" (vide)
```

### Commandes Multiples
```
Soumettez 3 commandes d'affilée
Vérifiez chaque a un ID unique
```

### Longues Données
```
Prénom très long: "JeanPaulHenriChristopheJosephMarcel..."
Adresse très longue: "123 Rue de la Très Longue Adresse..."
```

## ✅ Checklist Finale

Avant de dire "Terminé", vérifiez:

- [ ] Tous les tests fonctionnels passent
- [ ] Tous les tests design passent
- [ ] Tous les tests accessibility passent
- [ ] Tous les tests email passent
- [ ] Tous les tests WhatsApp passent
- [ ] Performance > 90 sur Lighthouse
- [ ] Pas d'erreurs console
- [ ] Responsive OK sur mobile/tablet/desktop
- [ ] Documentation complète
- [ ] README à jour
- [ ] SETUP.md complète
- [ ] DEPLOYMENT.md prêt

## 🎉 Si Tous les Tests Passent

Vous êtes prêt pour:
- [ ] Déployer en production
- [ ] Faire la promotion
- [ ] Lancer les ventes!

---

**Bon testing!** 🚀
