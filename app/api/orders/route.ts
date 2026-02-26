import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('📦 Commande reçue:', body);

    const { firstName, lastName, email, phone, address, city, zipCode, deliveryType, items, total } = body;

    // Générer un numéro de commande unique
    const orderId = `CMD-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 1000)}`;

    const formatPrice = (price: number) => price.toLocaleString('fr-FR');

    // Calculer la date de livraison estimée
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (deliveryType === 'express' ? 3 : 7));
    const formattedDeliveryDate = deliveryDate.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Email pour l'administrateur (vous)
    await resend.emails.send({
      from: 'iWAV <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL || 'michaelhologan45@gmail.com'],
      subject: `🛍️ Nouvelle commande #${orderId} - ${firstName} ${lastName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #667eea; }
            table { width: 100%; border-collapse: collapse; }
            th { background: #667eea; color: white; padding: 10px; text-align: left; }
            td { padding: 10px; border-bottom: 1px solid #ddd; }
            .total { font-size: 1.2em; font-weight: bold; color: #667eea; text-align: right; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛍️ NOUVELLE COMMANDE</h1>
              <p>#${orderId}</p>
            </div>
            <div class="content">
              <div class="info-box">
                <h3>👤 Client</h3>
                <p><strong>Nom:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${phone}</p>
                <p><strong>Adresse:</strong> ${address}, ${city} ${zipCode}</p>
                <p><strong>Livraison:</strong> ${deliveryType === 'express' ? 'Express (3-7 jours)' : 'Standard (7-10 jours)'}</p>
              </div>

              <h3>📦 Articles commandés</h3>
              <table>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Qté</th>
                    <th>Prix</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map((item: any) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>${formatPrice(item.price)} FCFA</td>
                      <td>${formatPrice(item.price * item.quantity)} FCFA</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <div class="total">
                <p><strong>TOTAL: ${formatPrice(total)} FCFA</strong></p>
              </div>

              <p style="text-align: center; margin-top: 20px;">
                <a href="https://wa.me/${process.env.ADMIN_PHONE || '+2290192338598'}?text=${encodeURIComponent(`Bonjour, je suis ${firstName} ${lastName} et je souhaite suivre ma commande #${orderId}`)}" 
                   style="background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                  📱 Contacter le client
                </a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Email de confirmation pour le CLIENT
    console.log('📧 TENTATIVE ENVOI CLIENT - To:', email);

    const customerEmail = await resend.emails.send({
      from: 'iWAV <onboarding@resend.dev>',
      to: [email],
      subject: `✅ Votre commande #${orderId} est confirmée - Merci ${firstName} !`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
              background: #f5f5f5;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white; 
              border-radius: 16px; 
              overflow: hidden; 
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center; 
            }
            .header h1 { 
              margin: 0; 
              font-size: 28px; 
              font-weight: 600; 
            }
            .header p { 
              margin: 10px 0 0; 
              opacity: 0.9; 
              font-size: 16px; 
            }
            .content { 
              padding: 40px 30px; 
            }
            .order-badge {
              display: inline-block;
              background: #667eea;
              color: white;
              padding: 8px 20px;
              border-radius: 50px;
              font-size: 14px;
              font-weight: 500;
              margin-bottom: 20px;
            }
            .greeting {
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 20px;
              color: #333;
            }
            .greeting span {
              color: #667eea;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin: 25px 0;
            }
            .info-card {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 10px;
            }
            .info-card h4 {
              margin: 0 0 10px;
              color: #667eea;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .info-card p {
              margin: 5px 0;
              font-size: 14px;
            }
            .info-card strong {
              font-size: 16px;
            }
            .order-summary {
              background: #f8f9fa;
              padding: 25px;
              border-radius: 12px;
              margin: 25px 0;
            }
            .order-summary h3 {
              margin: 0 0 15px;
              color: #333;
            }
            .order-item {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e0e0e0;
            }
            .order-item:last-child {
              border-bottom: none;
            }
            .item-name {
              font-weight: 500;
            }
            .item-price {
              color: #667eea;
              font-weight: 600;
            }
            .total-section {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              border-radius: 10px;
              margin: 25px 0;
              text-align: center;
            }
            .total-label {
              font-size: 14px;
              opacity: 0.9;
              margin-bottom: 5px;
            }
            .total-amount {
              font-size: 32px;
              font-weight: 700;
            }
            .timeline {
              margin: 30px 0;
            }
            .timeline-item {
              display: flex;
              gap: 15px;
              margin-bottom: 20px;
            }
            .timeline-dot {
              width: 24px;
              height: 24px;
              background: #667eea;
              border-radius: 50%;
              position: relative;
              flex-shrink: 0;
            }
            .timeline-dot::after {
              content: '';
              position: absolute;
              top: 24px;
              left: 11px;
              width: 2px;
              height: 40px;
              background: #e0e0e0;
            }
            .timeline-item:last-child .timeline-dot::after {
              display: none;
            }
            .timeline-content h4 {
              margin: 0 0 5px;
              font-size: 16px;
            }
            .timeline-content p {
              margin: 0;
              color: #666;
              font-size: 14px;
            }
            .whatsapp-button {
              display: inline-block;
              background: #25D366;
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 20px 0;
              text-align: center;
            }
            .footer {
              text-align: center;
              padding: 20px;
              border-top: 1px solid #e0e0e0;
              color: #666;
              font-size: 14px;
            }
            .social-proof {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: center;
            }
            .stars {
              color: #ffc107;
              font-size: 20px;
              margin-bottom: 10px;
            }
            @media (max-width: 600px) {
              .info-grid {
                grid-template-columns: 1fr;
              }
              .header h1 {
                font-size: 24px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ Merci pour votre commande !</h1>
              <p>Nous sommes ravis de vous compter parmi nos clients</p>
            </div>
            
            <div class="content">
              <div class="order-badge">
                Commande #${orderId}
              </div>
              
              <div class="greeting">
                Bonjour <span>${firstName} ${lastName}</span>,
              </div>
              
              <p style="font-size: 16px; color: #666; margin-bottom: 25px;">
                Nous vous confirmons la réception de votre commande. Notre équipe s'occupe de préparer votre colis avec la plus grande attention.
              </p>

              <div class="info-grid">
                <div class="info-card">
                  <h4>📦 Mode de livraison</h4>
                  <p><strong>${deliveryType === 'express' ? 'Express (3-7 jours)' : 'Standard (7-10 jours)'}</strong></p>
                  <p>Livraison gratuite</p>
                </div>
                <div class="info-card">
                  <h4>📅 Date estimée</h4>
                  <p><strong>${formattedDeliveryDate}</strong></p>
                  <p>Vous serez notifié dès l'expédition</p>
                </div>
              </div>

              <div class="order-summary">
                <h3>🛒 Récapitulatif de votre commande</h3>
                ${items.map((item: any) => `
                  <div class="order-item">
                    <span class="item-name">${item.name} x${item.quantity}</span>
                    <span class="item-price">${formatPrice(item.price * item.quantity)} FCFA</span>
                  </div>
                `).join('')}
              </div>

              <div class="total-section">
                <div class="total-label">Total de votre commande</div>
                <div class="total-amount">${formatPrice(total)} FCFA</div>
                <p style="margin: 10px 0 0; opacity: 0.9; font-size: 14px;">Toutes taxes incluses</p>
              </div>

              <div class="timeline">
                <h3 style="margin-bottom: 20px;">📋 Suivi de votre commande</h3>
                
                <div class="timeline-item">
                  <div class="timeline-dot" style="background: #10b981;"></div>
                  <div class="timeline-content">
                    <h4>✅ Commande confirmée</h4>
                    <p>${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>📦 Préparation en cours</h4>
                    <p>Notre équipe prépare votre colis avec soin</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>🚚 Expédition</h4>
                    <p>Vous recevrez un numéro de suivi par email</p>
                  </div>
                </div>

                <div class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <h4>📬 Livraison</h4>
                    <p>Prévue le ${formattedDeliveryDate}</p>
                  </div>
                </div>
              </div>

              <div style="text-align: center;">
                <a href="https://wa.me/${process.env.ADMIN_PHONE || '+2290192338598'}?text=${encodeURIComponent(`Bonjour, je suis ${firstName} ${lastName} et je souhaite suivre ma commande #${orderId}`)}" 
                   class="whatsapp-button">
                  📱 Nous contacter sur WhatsApp
                </a>
              </div>

              <div class="social-proof">
                <div class="stars">★★★★★</div>
                <p style="font-weight: 500; margin-bottom: 5px;">Plus de 2000 clients satisfaits</p>
                <p style="color: #666; font-size: 14px; margin: 0;">Livraison rapide et service client disponible 7j/7</p>
              </div>

              <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; font-size: 14px;">
                <p style="margin: 0 0 5px;"><strong>📞 Une question ?</strong></p>
                <p style="margin: 0; color: #666;">
                  Notre équipe est à votre disposition du lundi au samedi de 9h à 19h.
                </p>
              </div>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} iWAV - Tous droits réservés</p>
              <p style="margin: 5px 0;">📧 commandes@iwav.com | 📞 +229 01 92 33 85 98</p>
              <p style="margin: 10px 0 0; font-size: 12px; color: #999;">
                Cet email est une confirmation automatique de votre commande. Merci de ne pas y répondre.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log('✅ RÉPONSE RESEND:', customerEmail);
    console.log('✅ EMAIL CLIENT ENVOYÉ À:', email);

    return NextResponse.json({ 
      success: true, 
      orderId,
      message: 'Commande envoyée avec succès'
    });

  } catch (error) {
    console.error('❌ ERREUR:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de la commande' },
      { status: 500 }
    );
  }
}