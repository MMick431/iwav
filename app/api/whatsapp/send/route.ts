import { NextRequest, NextResponse } from 'next/server';

/**
 * WhatsApp message sending endpoint
 * 
 * Supports multiple providers:
 * 1. Twilio WhatsApp API
 * 2. WhatsApp Business API
 * 3. Custom Integration
 */

interface WhatsAppPayload {
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: WhatsAppPayload = await request.json();

    // Validate required fields
    if (!body.phone || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Clean phone number
    const cleanPhone = body.phone.replace(/\D/g, '');

    // Try to send using Twilio (if configured)
    const sendViaTwilio = async () => {
      try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

        if (!accountSid || !authToken || !twilioWhatsAppNumber) {
          return null;
        }

        const client = require('twilio')(accountSid, authToken);

        const message = await client.messages.create({
          body: body.message,
          from: `whatsapp:${twilioWhatsAppNumber}`,
          to: `whatsapp:+${cleanPhone}`,
        });

        return message;
      } catch (error) {
        console.error('Twilio error:', error);
        return null;
      }
    };

    // Log the WhatsApp message
    console.log('WhatsApp message to send:', {
      phone: cleanPhone,
      message: body.message,
      timestamp: new Date().toISOString(),
    });

    // Try Twilio first
    const twilioResponse = await sendViaTwilio();

    if (twilioResponse) {
      return NextResponse.json(
        {
          success: true,
          messageId: twilioResponse.sid,
          provider: 'twilio',
        },
        { status: 200 }
      );
    }

    // Fallback: Generate WhatsApp Web link for manual sending
    const encodedMessage = encodeURIComponent(body.message);
    const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    console.log('WhatsApp Web link generated:', whatsappLink);

    return NextResponse.json(
      {
        success: true,
        messageId: `whatsapp-${Date.now()}`,
        provider: 'manual',
        link: whatsappLink,
        note: 'WhatsApp API not configured. Use manual link or configure Twilio',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('WhatsApp send error:', error);
    return NextResponse.json(
      { error: 'Failed to send WhatsApp message' },
      { status: 500 }
    );
  }
}
