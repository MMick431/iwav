/**
 * Email Integration Service
 * Handles sending emails for order confirmations and notifications
 * 
 * Supported providers:
 * - Resend (recommended for Vercel)
 * - SendGrid
 * - Mailgun
 * - Custom SMTP
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

interface OrderEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  deliveryType: 'standard' | 'express';
  items: Array<{ id: string; name: string; price: number; quantity: number }>;
  total: number;
  orderId: string;
}

/**
 * Send email via API
 */
export async function sendEmail(
  options: EmailOptions
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate customer order confirmation email HTML
 */
export function generateCustomerOrderEmail(data: OrderEmailData): string {
  const itemsList = data.items
    .map(item => `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong>
          <br>
          <span style="color: #666;">x${item.quantity}</span>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `)
    .join('');

  const deliveryInfo = data.deliveryType === 'standard'
    ? { title: 'Livraison Standard', time: '7-10 jours', color: '#8b5cf6' }
    : { title: 'Livraison Express', time: '3-7 jours', color: '#a78bfa' };

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #9333ea 0%, #a78bfa 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .content {
            padding: 30px 20px;
        }
        .greeting {
            font-size: 16px;
            margin-bottom: 20px;
            color: #333;
        }
        .order-id {
            background-color: #f0f4ff;
            border-left: 4px solid #9333ea;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .order-id strong {
            color: #9333ea;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #1a1a1a;
            margin-top: 25px;
            margin-bottom: 15px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 10px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        .summary-row.total {
            font-size: 18px;
            font-weight: bold;
            color: #9333ea;
            border: none;
            padding-top: 15px;
            margin-top: 15px;
        }
        .delivery-info {
            background-color: #f9f5ff;
            border-left: 4px solid ${deliveryInfo.color};
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .delivery-info strong {
            color: ${deliveryInfo.color};
        }
        .address-box {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 4px;
            margin: 15px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f9f9f9;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #666;
        }
        .cta-button {
            display: inline-block;
            background-color: #9333ea;
            color: white;
            padding: 12px 30px;
            border-radius: 6px;
            text-decoration: none;
            margin: 20px 0;
            font-weight: bold;
        }
        .highlight {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📱 PhoneSelect</h1>
            <p>Commande Reçue avec Succès!</p>
        </div>

        <div class="content">
            <div class="greeting">
                Bonjour <strong>${data.firstName}</strong>,
            </div>

            <p>Merci pour votre commande! Nous avons bien reçu votre demande et allons la traiter dans les plus brefs délais.</p>

            <div class="order-id">
                Votre numéro de commande: <strong>#${data.orderId}</strong>
            </div>

            <div class="section-title">📦 Produits</div>
            <table>
                ${itemsList}
            </table>

            <div class="section-title">💰 Résumé</div>
            <div class="summary-row">
                <span>Sous-total</span>
                <span>$${data.total.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Livraison</span>
                <span>Incluse</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>$${data.total.toFixed(2)}</span>
            </div>

            <div class="delivery-info">
                <strong>${deliveryInfo.title}</strong><br>
                Livraison estimée: <strong>${deliveryInfo.time}</strong>
            </div>

            <div class="section-title">📍 Adresse de Livraison</div>
            <div class="address-box">
                ${data.firstName} ${data.lastName}<br>
                ${data.address}<br>
                ${data.city} - ${data.zipCode}<br>
                <br>
                Téléphone: ${data.phone}
            </div>

            <div class="highlight">
                <strong>⏰ Les Prochaines Étapes</strong><br>
                • Nous confirmerons votre commande via WhatsApp ou Email<br>
                • Votre téléphone sera préparé et expédié rapidement<br>
                • Vous recevrez un lien de suivi pour suivre votre colis<br>
                • Notre équipe reste à votre disposition pour toute question
            </div>

            <div style="text-align: center;">
                <p style="color: #666; font-size: 14px;">
                    Des questions? Contactez-nous via WhatsApp ou Email
                </p>
            </div>
        </div>

        <div class="footer">
            <p>PhoneSelect - Téléphones de Seconde Main de Qualité Premium</p>
            <p>Nous nous engageons à vous offrir les meilleurs produits et services</p>
            <p>&copy; 2024 PhoneSelect. Tous les droits réservés.</p>
        </div>
    </div>
</body>
</html>
  `.trim();
}

/**
 * Generate admin notification email
 */
export function generateAdminOrderEmail(data: OrderEmailData): string {
  const itemsList = data.items
    .map(item => `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `)
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: #333; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th { background: #f0f0f0; padding: 10px; text-align: left; font-weight: bold; }
        td { padding: 8px; border: 1px solid #ddd; }
        .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>NOUVELLE COMMANDE #${data.orderId}</h2>
        </div>

        <h3>Information Client</h3>
        <table>
            <tr><th>Champ</th><th>Valeur</th></tr>
            <tr><td>Nom</td><td>${data.firstName} ${data.lastName}</td></tr>
            <tr><td>Email</td><td>${data.email}</td></tr>
            <tr><td>Téléphone</td><td>${data.phone}</td></tr>
            <tr><td>Adresse</td><td>${data.address}, ${data.city} - ${data.zipCode}</td></tr>
            <tr><td>Livraison</td><td>${data.deliveryType === 'standard' ? 'Standard (7-10 jours)' : 'Express (3-7 jours)'}</td></tr>
        </table>

        <h3>Produits Commandés</h3>
        <table>
            <tr>
                <th>Produit</th>
                <th>Qty</th>
                <th>Prix</th>
                <th>Total</th>
            </tr>
            ${itemsList}
            <tr>
                <td colspan="3" style="text-align: right; font-weight: bold;">TOTAL:</td>
                <td style="text-align: right; font-weight: bold;">$${data.total.toFixed(2)}</td>
            </tr>
        </table>

        <div class="alert">
            <strong>Action requise:</strong> Veuillez contacter le client pour confirmer la disponibilité des produits et les détails de livraison.
        </div>
    </div>
</body>
</html>
  `.trim();
}
