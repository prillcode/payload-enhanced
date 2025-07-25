import nodemailer from 'nodemailer'
import type { Payload } from 'payload'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'

interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  from?: string
}

export async function sendEmail(payload: Payload, options: EmailOptions) {
  try {
    // Get email settings from SiteSettings
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    
    // Check if SMTP settings are configured
    if (siteSettings?.emailSettings?.smtpHost && siteSettings?.emailSettings?.smtpUser) {
      // Create transport with dynamic settings
      const smtpOptions: SMTPTransport.Options = {
        host: siteSettings.emailSettings.smtpHost || 'localhost',
        port: siteSettings.emailSettings.smtpPort || 587,
        secure: siteSettings.emailSettings.smtpPort === 465, // true for 465, false for other ports
        auth: {
          user: siteSettings.emailSettings.smtpUser || '',
          pass: siteSettings.emailSettings.smtpPassword || '',
        },
        tls: {
          rejectUnauthorized: siteSettings.emailSettings.enableTLS !== false,
        },
      }
      const transporter = nodemailer.createTransport(smtpOptions)

      // Prepare email message
      const mailOptions = {
        from: options.from || `${siteSettings.emailSettings.fromName || 'Your Site'} <${siteSettings.emailSettings.fromEmail || 'noreply@localhost'}>`,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      }

      // Send the email
      const result = await transporter.sendMail(mailOptions)
      console.log('✅ Email sent successfully:', result.messageId)
      return result
    } else {
      // No SMTP settings configured - log to console for development
      console.log('📧 Email would be sent (no SMTP configured):', {
        to: options.to,
        subject: options.subject,
        from: options.from || 'noreply@localhost',
        html: options.html,
        text: options.text,
      })
      return { messageId: 'console-' + Date.now() }
    }
  } catch (error) {
    console.error('❌ Failed to send email:', error instanceof Error ? error.message : String(error))
    throw error
  }
}

// Hook for Payload to use our custom email service (optional)
export function createEmailHook() {
  return {
    // This hook will be called whenever Payload needs to send an email
    beforeOperation: async ({ args, operation: _operation }: { args: any; operation: any }) => {
      // We can intercept email operations here if needed
      return args
    },
  }
}