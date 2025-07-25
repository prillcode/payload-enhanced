import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import { sendEmail } from '@/lib/email'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Get payload instance
    const payload = await getPayload({ config })

    // Get site settings for admin email
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
    const adminEmail = siteSettings?.contactEmail || 'admin@localhost'

    // Send email notification to admin
    await sendEmail(payload, {
      to: adminEmail,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    // Optional: Send confirmation email to user
    await sendEmail(payload, {
      to: email,
      subject: 'Thank you for contacting us',
      html: `
        <h2>Thank you for your message, ${name}!</h2>
        <p>We've received your message and will get back to you soon.</p>
      `,
      text: `Thank you for your message, ${name}! We've received your message and will get back to you soon.`,
    })

    return NextResponse.json({ success: true, message: 'Email sent successfully' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}