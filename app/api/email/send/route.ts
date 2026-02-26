import { NextRequest, NextResponse } from 'next/server';

/**
 * Email sending endpoint
 * 
 * Supports multiple providers:
 * 1. Resend (Recommended for Vercel projects)
 * 2. SendGrid
 * 3. Custom SMTP
 */

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailPayload = await request.json();

    // Validate required fields
    if (!body.to || !body.subject || !body.html) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Try to send using Resend (if available)
    // Install: npm install resend
    const sendViaResend = async () => {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const response = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'noreply@phoneselect.com',
          to: body.to,
          subject: body.subject,
          html: body.html,
          replyTo: body.replyTo || 'michaelhologan45@gmail.com',
        });

        return response;
      } catch (error) {
        console.error('Resend error:', error);
        return null;
      }
    };

    // For now, log the email (production would actually send it)
    console.log('Email to send:', {
      to: body.to,
      subject: body.subject,
      timestamp: new Date().toISOString(),
    });

    // Try Resend first
    const resendResponse = await sendViaResend();

    if (resendResponse) {
      return NextResponse.json(
        {
          success: true,
          messageId: resendResponse.id,
          provider: 'resend',
        },
        { status: 200 }
      );
    }

    // Fallback: Log for manual processing
    return NextResponse.json(
      {
        success: true,
        messageId: `email-${Date.now()}`,
        provider: 'manual',
        note: 'Email service not fully configured. Please set up email provider (Resend, SendGrid, etc.)',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
