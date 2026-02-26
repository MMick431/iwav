/**
 * WhatsApp Integration Service
 * Sends messages via WhatsApp using Web.whatsapp.com link generation
 * 
 * For production, you should integrate with:
 * - Twilio WhatsApp API
 * - WhatsApp Business API
 * - Custom WhatsApp integration via Meta
 */

interface WhatsAppMessage {
  phone: string;
  message: string;
}

/**
 * Generate WhatsApp message link
 * This creates a clickable link that opens WhatsApp with pre-filled message
 */
export function generateWhatsAppLink(phone: string, message: string): string {
  // Clean phone number (remove non-digits)
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Return WhatsApp Web link
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Send WhatsApp message via API
 * This would require integration with a service like Twilio
 */
export async function sendWhatsAppMessage(
  data: WhatsAppMessage
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const response = await fetch('/api/whatsapp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send WhatsApp message');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('WhatsApp send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Format order data into WhatsApp message
 */
export function formatOrderMessageForWhatsApp(data: any): string {
  const itemsList = data.items
    .map((item: any) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  const deliveryText = data.deliveryType === 'standard'
    ? '7-10 jours'
    : '3-7 jours';

  return `
📱 *Votre Commande - PhoneSelect*

*Produits:*
${itemsList}

*Total:* $${data.total.toFixed(2)}

*Livraison:*
${deliveryText}

*Informations:*
Nom: ${data.firstName} ${data.lastName}
Tél: ${data.phone}
Adresse: ${data.address}

Nous vous contacterons pour confirmer votre commande!
  `.trim();
}

/**
 * Create order confirmation message
 */
export function createOrderConfirmationMessage(orderId: string, customerName: string): string {
  return `
✅ *Merci pour votre commande!*

Votre commande #${orderId} a été bien reçue.

Nous traiterons votre demande dans les plus brefs délais et vous recontacterons par:
• WhatsApp
• Email
• SMS

À bientôt! 🚀
  `.trim();
}
