# Payload CMS Template - Outdoors Theme

**Powered by React, NextJS, and Payload CMS** this template is an outdoor-themed website for vacation destinations with lodging/accomodations.

## 💼 Need Customization?

If you get stuck or just want someone to do all of the work for you, let me customize and deploy this template as your business website!  
<a href="https://apdev.pro" target="_blank" rel="noopener noreferrer">Who am I? Visit apdev.pro to learn more.</a>

<a href="https://github.com/prillcode/payload-outdoors-template/issues/new?title=Interested%20in%20this%20Theme&body=Hi!%20Help%20me%20to%20customize%20this%20template%20for%20my%20business.%0A%0A**About%20my%20business:**%0A%0A**What%20I'm%20looking%20for:**%0A%0A**Timeline:**%0A%0A**Budget%20range:**%0A%0A**Contact%20info:**" target="_blank" rel="noopener noreferrer">
<img src="https://img.shields.io/badge/💼%20Hire%20Me-Customize%20This%20Template-blue?style=for-the-badge" alt="Hire Me to Customize this Template for your Business">
</a>

## Table of Contents
- [What You Get with this Theme](#-what-you-get-with-this-theme)
  - [Theme File Organization](#theme-file-organization)
- [Quick Start - Local Setup](#-quick-start---local-setup)
  - [Clone Repo or Use this Template](#clone-repo-or-use-this-template)
  - [Front-end Development](#front-end-development)
  - [Back-end CMS](#back-end-cms)
- [Extended Walkthrough](#-extended-walkthrough)
  - [Payload CMS](#payload-cms)
  - [Default Payload Collections](#default-payload-collections)
- [Email Configuration](#-email-configuration)
  - [Internal Payload Emails (Environment Variables)](#internal-payload-emails-environment-variables)
  - [Application Emails (Admin Configurable)](#application-emails-admin-configurable)
- [Custom Webhost Deployment](#-custom-webhost-deployment)
- [Vercel or Netlify Deployment](#-vercel-or-netlify-deployment)
- [Migrating Your Collection Data](#-migrating-your-collection-data)
- [Need Help?](#-need-help)
- [Questions](#-questions)

## ✨ What You Get with this Theme 

- **Nature/Outdoor Adventure Design**: Custom color palette with forest and earth tones, designed specifically for outdoor destinations and adventure tourism
- **Fully Responsive Layout**: Mobile-first design with responsive header navigation, collapsible mobile menu, and optimized layouts for all screen sizes
- **Dynamic Hero Sections**: Customizable hero components with gradient backgrounds, call-to-action buttons, and flexible content layouts
- **Content Management**: Complete Payload CMS integration for managing accommodations, activities, and custom pages without code changes
- **Custom Page Builder**: Rich content editor powered by Lexical that allows creation of flexible page layouts with multiple section types (full-width, two-column, centered)
- **SEO Optimized**: Built-in SEO fields for meta titles, descriptions, and keywords on all content types, plus automatic OpenGraph support
- **Dynamic Routing**: Automatic page generation for accommodations (`/accommodations/[slug]`), activities (`/activities/[slug]`), and custom pages (`/pages/[slug]`)
- **Admin Panel Access**: Easy access to Payload CMS admin interface via footer link for content management
- **Sample Data Included**: Pre-built sample accommodations, activities, and pages to get started quickly
- **TypeScript Ready**: Full TypeScript support with auto-generated types for type-safe development
- **Database Flexibility**: PostgreSQL in Docker/Podman for development and production consistency. SQLite alternative available via DATABASE_URI configuration, though PostgreSQL is recommended for migration-safe development
- **Dynamic Email System**: Dual email configuration supporting both Payload's internal emails (password resets, user management) via environment variables and application emails (contact forms, bookings) via admin-configurable SMTP settings in Site Settings
- **Contact Form API**: Ready-to-use contact form API endpoint (`/api/contact`) with email notifications and admin-configurable recipients
- **Email Testing**: Includes Mailtrap Sandbox configuration for safe email testing during development. For production, easily switch to any SMTP provider (Gmail, SendGrid, Mailgun, production Mailtrap, etc.)

### Theme File Organization

```
src/app/
├── (frontend)/
│   ├── _components/
│   │   ├── Hero.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── activities/
│   │   └── page.tsx         # /activities route (list of Activities)
|   |   └── [slug]/
|   │       └── page.tsx     # /activities/[slug] route (single Activity)
│   ├── accomodations/
│   │   └── page.tsx         # /accomodations route (list of Accommodations)
|   |   └── [slug]/
|   │       └── page.tsx     # /accomodations/[slug] route (single Accommodation)
│   ├── pages/
|   |   └── [slug]/
|   │       └── page.tsx     # /pages/[slug] route (dynamically renders /about, /contact, etc)
│   ├── layout.tsx           # Frontend layout with Header/Footer
│   └── page.tsx             # Homepage
└── ...

public/
└── images/
    ├── placeholder-hero.jpg
    └── placeholder-activities-hero.jpg
```


## 🚀 Quick Start - Local Setup

### Prerequisites

- **Docker or Podman**: Required for running the PostgreSQL database container
  - Docker: Install from [docker.com](https://docker.com)
  - Podman: Alternative container runtime, especially useful on Windows
- **Node.js & pnpm**: For running the Next.js application

### Clone Repo or Use this Template

You'll want to have standalone copy of this repo on your machine. You can either Clone the repo or Use this Template (recommended):

**Option 1: Use this Template (Recommended)**
1. Click the green **Use this template** button at the top of this repository
2. Select **Create a new repository**
3. Choose your repository name and settings
4. Clone your new repository to your machine

**Option 2: Clone this Repository**
1. Clone this repository directly: `git clone [repo-url]`
2. Note: This maintains connection to the original repo's git history

### Front-end Development

1. Once you have the repo on your machine, follow the steps below.
2. `cd my-project && cp .env.example .env` to copy the example environment variables. 
3. Start the PostgreSQL database: `docker compose up -d` (or `podman compose up -d` if using Podman)
4. `pnpm install && pnpm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser

That's it! Changes made in `./src` will be reflected in your app. 

### Back-end CMS

Navigate to `https://localhost/admin` to access the Payload Admin panel and follow the on-screen instructions to login and create your first admin user. Then check out [Payload CMS](#payload-cms) below once you're ready to build and serve your app, and the Deployment sections when you're ready to go live.

## 📚 Extended Walkthrough

**PostgreSQL for Development**: By default, this template uses PostgreSQL in a Docker/Podman container for local development. This matches production database technology, ensuring migration consistency and eliminating development-to-production database differences. While SQLite is available via DATABASE_URI configuration, PostgreSQL is recommended for a professional development workflow.

### Payload CMS

1. When you run the dev server with `pnpm dev`, Payload reads your configuration from `src/payload.config.ts`, which defines:
   - Database connection (PostgreSQL via Docker/Podman for local development)
   - Default Collections (Payload defaults): Users, Media
   - Custom Collections (added by this Template): Accommodations, Activities, and Pages
   - Admin UI settings
   - Access control

2. Each collection is defined in its own TypeScript file in the `/collections` directory:
   - `Users.ts` - Payload default > Admin users who can log into the system
   - `Media.ts` - Payload default > Images and other uploaded files
   - `Accommodations.ts` - Custom with this theme > Accommodations/Lodging to list and feature on your site
   - `Activities.ts` - Custom with this theme > Activities/Experiences to list and feature on your site
   - `Pages.ts` - Custom with this theme > Create custom Pages with rich content w/o coding (About, Contact, Featured, etc.)

   The **Pages collection** allows you to create custom pages with:
   - Hero sections with customizable titles, descriptions, and gradients
   - Rich text content using Lexical editor with headings, paragraphs, and formatting
   - Additional sections with flexible layouts (full-width, two-column, centered)
   - SEO fields for meta titles, descriptions, and keywords
   - URL-friendly slugs for routing (e.g., `/pages/about`, `/pages/contact`)
   
   Pages are automatically accessible at `/pages/[slug]` on your site once published, making it easy to add custom content like company information, contact details, or any other static pages your site needs.

3. Accessing the CMS Admin Panel:
   - Once your dev server is running, go to `http://localhost:3000/admin`
   - On first run, you'll be prompted to create an admin user
   - Follow the on-screen instructions to set up your credentials

4. Creating Initial Content:
   - After logging in, you'll see all collections in the sidebar
   - Start by uploading some images to the Media collection
   - Then create Accommodations and Activities, referencing those media items
   - **Want sample data?** Run: ```pnpm seed``` to insert the accommodations, activities, and pages in the /sample-data directory of this template.
   - All content you create is stored in your PostgreSQL database container
   - This content will be immediately available to your frontend!

5. Database Seeding and Migrations:
   - The first time you run the dev server, Payload creates database tables based on your collection schemas
   - Your database structure and TypeScript types should always match your collection definitions
   
   **Understanding Schema Changes:**
   - **New Collections**: When you add a new collection (like `Pages.ts`), Payload auto-detects it on restart
   - **Modified Collections**: When you change existing collection fields, you may need migrations
   - **Type Safety**: Always regenerate types after any schema changes
   
   **Working with Migrations:**
   - Check what changes Payload detected: `pnpm payload migrate:create`
   - Apply pending migrations: `pnpm payload migrate`
   - Check migration status: `pnpm payload migrate:status`
   - Reset and rebuild everything: `pnpm payload migrate:fresh`
   
   **Type Generation (Always Safe):**
   - After any schema changes: `pnpm payload generate:types`
   - This updates your TypeScript definitions to match your current collections
   - Run this after adding new collections or modifying existing ones
   
   **Development Workflow:**
   1. **Add new collection or modify existing**: Make changes to your `.ts` files in `/collections`
   2. **Restart dev server**: Payload auto-detects most changes
   3. **Generate types**: `pnpm payload generate:types` (safe to run anytime)
   4. **If schema conflicts occur**: `pnpm payload migrate:fresh` (destroys all data)
   5. **Re-seed sample data**: `pnpm seed`
   
   **Starting Fresh During Development:**
   - Use `pnpm payload migrate:fresh` when you encounter schema conflicts
   - This drops all tables and data, then recreates them from scratch
   - **Warning**: This deletes ALL data including admin users and content
   - Best practice: Export your data first if you want to keep it
   
   **Seeding Sample Data:**
   - Run `pnpm seed` to populate with sample accommodations, activities, and pages
   - The seed script creates an admin user (check console for credentials)
   - Sample data files in `/sample-data/` can be customized for your needs
   - Safe to run multiple times - checks for existing data before inserting


### Default Payload Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled collections that have access to the admin panel.

  For additional help, see the official <a href="https://github.com/payloadcms/payload/tree/main/examples/auth" target="_blank" rel="noopener noreferrer">[Auth Example]</a> or the <a href="https://payloadcms.com/docs/authentication/overview#authentication-overview" target="_blank" rel="noopener noreferrer">[Authentication]</a>.


- #### Media

  This is the uploads enabled collection. It features pre-configured sizes, focal point and manual resizing to help you manage your pictures.

## 📧 Email Configuration

This template includes a comprehensive dual email system designed for both development testing and production use. The system separates Payload's internal emails (user management) from application emails (contact forms, notifications) for maximum flexibility.

The email functionality is built on **nodemailer** and can be customized by modifying `src/lib/email.ts`. The template includes a working contact form API endpoint (`/api/contact`) that demonstrates the email system and serves as a foundation for building additional email-enabled features.

### Internal Payload Emails (Environment Variables)

Payload CMS uses these environment variables for system emails like password resets, user welcome emails, and admin notifications:

**Configuration**: Set in your `.env` file:
```env
FROM_EMAIL=noreply@yoursite.com
FROM_NAME=Your Site Name
SMTP_HOST=sandbox.smtp.mailtrap.io  # Use Mailtrap for testing
SMTP_PORT=587
SMTP_USER=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
```

**Development**: Uses Mailtrap Sandbox by default - emails are captured safely for testing without sending to real addresses.

**Production**: Replace with your production SMTP provider (Gmail, SendGrid, Mailgun, production Mailtrap, etc.).

### Application Emails (Admin Configurable)

Application emails (contact forms, booking notifications, newsletters) use dynamically configurable SMTP settings that can be updated through the admin panel without requiring code changes or server restarts.

**Configuration**: Admin Panel → Site Settings → Email Settings
- SMTP Host, Port, Authentication
- From Email Address and Display Name  
- TLS/SSL Security Settings

**Usage**: The custom `sendEmail()` function in `src/lib/email.ts` automatically reads these settings from the database each time an email is sent.

**Example**: The included `/api/contact` endpoint demonstrates how to:
- Send email notifications to admins
- Send confirmation emails to users
- Use the dynamic email configuration system

**Custom Development**: Use the `sendEmail()` function in your API routes, server actions, or webhooks for any application email needs.

## 🌐 Custom Webhost Deployment

For deployment to a remote Node/NextJS server, there are several options including VPS deployments with Coolify, traditional hosting providers, or cloud platforms. For developers interested in Coolify deployments from GitHub repositories, feel free to consult with me for specific setup guidance.

General deployment steps (without Coolify or another Auto deployment dashboard):

- **Database Configuration**: Update your production `.env` with your PostgreSQL connection details (development and production now use the same database technology)
- **Environment Variables**: Update your production `.env` with your database URI (e.g., `DATABASE_URI=postgresql://username:password@host:port/database` or `DATABASE_URI=mysql://username:password@host:port/database`)
- **Build Process**: Run `pnpm build` to create the production build
- **File Upload**: Upload your built application files to your server
- **Dependencies**: Run `pnpm install --production` on your server to install only production dependencies
- **Database Setup**: Ensure your PostgreSQL or MariaDB database is created and accessible
- **Start Application**: Use your hosting provider's process manager or run `pnpm start` to launch the application

**Adding Sample Data (Optional):**
- **Coolify users**: Access your project's **Terminal** tab and run `pnpm seed` to add sample accommodations, activities, and pages
- **Other platforms**: SSH into your server and run `pnpm seed` from your application directory
- **Note**: Only run seeding on fresh deployments or when you specifically want sample data

**Database Options**: Most hosting providers support PostgreSQL, MySQL/MariaDB, or MongoDB - all work excellently with Payload CMS.

## ▲ Vercel or Netlify Deployment

Serverless platforms like Vercel and Netlify offer convenient deployment with automatic GitHub integration, but can result in higher costs compared to VPS hosting due to serverless function usage, database egress fees, and bandwidth charges as your application scales.

**Vercel Deployment:**
- **Database**: Connect to a cloud database service like Supabase (PostgreSQL), PlanetScale (MySQL), or MongoDB Atlas
- **Environment Variables**: Add your production database URI, email SMTP settings, and S3 credentials in the Vercel dashboard
- **Build Settings**: Vercel automatically detects Next.js applications and configures build settings
- **Deploy**: Connect your GitHub repository for automatic deployments on push
- **Email Configuration**: Update environment variables with production SMTP provider settings

**Netlify Deployment:**
- **Functions**: Netlify automatically handles API routes as serverless functions
- **Database**: Use external database providers (Supabase, PlanetScale, MongoDB Atlas)
- **Environment Variables**: Configure in Netlify dashboard under Site Settings → Environment Variables
- **Build Command**: Set to `pnpm build` in deploy settings if not auto-detected

Note that Vercel's serverless environment works well with Payload CMS, but ensure your database provider supports connection pooling for optimal performance.

## 🔄 Development to Production Workflow

This template uses PostgreSQL for both development and production environments, ensuring consistency and eliminating database-related deployment issues. Here's how the workflow works:

**Local Development (PostgreSQL in Docker/Podman):**
1. **Fresh start**: Clone the template and start the database container with `docker compose up -d`
2. **Automatic schema creation**: Run `pnpm dev` and Payload automatically creates PostgreSQL tables based on your collection definitions
3. **Content creation**: Add accommodations, activities, and pages through the admin panel
4. **Schema changes**: When you modify collections, use migrations (`pnpm payload migrate:create` then `pnpm payload migrate`) for safe schema updates

**Production Deployment (PostgreSQL):**
1. **Database setup**: Configure your production `DATABASE_URI` to point to your production PostgreSQL database
2. **Schema migration**: Use the same migration files from development to ensure identical schema structure
3. **Data transfer**: Use the export/import process below to transfer your development content if needed
4. **Consistent environment**: Development and production use the same database technology

**Key Benefits:**
- **Database consistency**: Same PostgreSQL technology in development and production
- **Migration safety**: Test schema changes locally before applying to production
- **Professional workflow**: Matches industry-standard development practices
- **Type safety**: TypeScript types are generated from your collections, not your database
- **S3 media continuity**: When using S3 storage (recommended), media files and references seamlessly work across both environments without any file transfers needed (set S3 config in .env file)

**Alternative: SQLite Option**
If you prefer SQLite for rapid prototyping, change your `DATABASE_URI` in `.env` to a file path (e.g., `file:./cms.db`). However, this is only recommended for:
- Quick demos or proof-of-concepts
- Projects that will never need complex migrations
- Single-developer projects with no production deployment plans

### Migrating Your Collection Data

To transfer your collection data from development to production PostgreSQL databases:

1. **Export your data from local PostgreSQL**:
   ```bash
   pnpm payload export --output=./my-backup.json
   ```
2. **Upload the backup file** to your production server
3. **Import data to your production database**:
   ```bash
   pnpm payload import --file=./my-backup.json
   ```
4. **Verify your data**: Log into the admin panel to ensure all collections were imported correctly
5. **Media files**: 
   - **Using S3 storage (recommended)**: No additional steps needed! Media files and references work automatically across environments
   - **Using local file storage**: You'll need to separately transfer media files from your local media directory to your production server's media storage

## 🆘 Need Help?

Don't want to do all of the above legwork? Hire Me to Customize and Deploy this Template for your Business!  

Hire Me to Customize and Deploy this Template for your Business  
<a href="https://github.com/prillcode/payload-outdoors-template/issues/new?title=Interested%20in%20this%20Theme&body=Hi!%20Help%20me%20to%20customize%20this%20template%20for%20my%20business.%0A%0A**About%20my%20business:**%0A%0A**What%20I'm%20looking%20for:**%0A%0A**Timeline:**%0A%0A**Budget%20range:**%0A%0A**Contact%20info:**" target="_blank" rel="noopener noreferrer">
<img src="https://img.shields.io/badge/💼%20Hire%20Me-Customize%20This%20Template-blue?style=for-the-badge" alt="Hire Me to Customize this Template for your Business">
</a>

--

## ❓ Questions

If you have any issues or questions, start a [GitHub discussion](https://github.com/prillcode/payload-outdoors-template/discussions).
