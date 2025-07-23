import { GlobalConfig } from 'payload'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteTitle',
      label: 'Site Title',
      type: 'text',
      required: true,
      defaultValue: 'Custom Site Title',
    },
    {
      name: 'siteDescription',
      label: 'Site Description',
      type: 'textarea',
      required: true,
      defaultValue: 'Set Site Title and Description in Admin Panel',
    },
    {
      name: 'showSiteDescriptionInHeader',
      label: 'Show Site Description in Header',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'siteLogo',
      label: 'Site Logo',
      type: 'upload',
      relationTo: 'media', // or your media collection slug
      required: false,
    },
    // Add boolean property 'hideSiteTitleIfLogo'
    {
      name: 'hideSiteTitleIfLogo',
      label: 'Hide Site Title if Logo is Present',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'primaryColor',
      label: 'Primary Color',
      type: 'text',
      required: false,
      admin: {
        description: 'Hex code or CSS color for branding (e.g., #1a202c)',
      },
    },
    // Add properties - homeHeroTitle and homeHeroDescription
    {
      name: 'homeHeroTitle',
      label: 'Home Hero Title',
      type: 'text',
      required: true,
      defaultValue: 'Explore the Great Outdoors',
    },
    {
      name: 'homeHeroDescription',
      label: 'Home Hero Description',
      type: 'textarea',
      required: false,
      defaultValue: 'Discover peaceful retreats and thrilling adventures in the heart of nature.',
    },
    {
      name: 'homeHeroIntroText',
      label: 'Home Hero Detailed Introduction',
      type: 'textarea',
      required: false,
      defaultValue:
        'NOTE: Customize the Hero content in the Admin Panel. Ex: Welcome to Great Outdoors, where adventure meets comfort in the heart of nature. We connect people with unforgettable outdoor experiences...',
    },
    {
      name: 'homePageSlider',
      label: 'Home Page Slider',
      type: 'group',
      fields: [
        {
          name: 'slides',
          label: 'Slides',
          type: 'array',
          fields: [
            {
              name: 'image',
              label: 'Image',
              type: 'upload',
              relationTo: 'media', // relation to media collection slug
              required: true,
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'text',
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: 'homeActivitiesSection',
      label: 'Home Activities Section',
      type: 'group',
      fields: [
        {
          name: 'displaySection',
          label: 'Display Section',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Toggle to show or hide this section on the homepage',
          },
        },
        {
          name: 'title',
          label: 'Section Title',
          type: 'text',
          required: true,
          defaultValue: 'Popular Activities',
        },
        {
          name: 'description',
          label: 'Section Description',
          type: 'textarea',
          required: false,
          defaultValue:
            'Experience the thrill of outdoor adventures with our carefully curated selection of activities. From heart-pumping adventures to peaceful nature experiences, there is something for everyone.',
        },
        {
          name: 'numberOfItems',
          label: 'Number of Items to Show',
          type: 'number',
          defaultValue: 3,
          required: true,
        },
      ],
    },
    {
      name: 'homeAccommodationsSection',
      label: 'Home Accommodations/Lodging Section',
      type: 'group',
      fields: [
        {
          name: 'displaySection',
          label: 'Display Section',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Toggle to show or hide this section on the homepage',
          },
        },
        {
          name: 'title',
          label: 'Section Title',
          type: 'text',
          required: true,
          defaultValue: 'Available Lodging',
        },
        {
          name: 'description',
          label: 'Section Description',
          type: 'textarea',
          required: false,
          defaultValue:
            'Explore our range of comfortable and scenic accommodations, perfect for your next getaway.',
        },
        {
          name: 'numberOfItems',
          label: 'Number of Items to Show',
          type: 'number',
          defaultValue: 3,
          required: true,
        },
      ],
    },
    {
      name: 'homeCallToActionSection',
      label: 'Home Call to Action Section',
      type: 'group',
      fields: [
        {
          name: 'displaySection',
          label: 'Display Section',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Toggle to show or hide this section on the homepage',
          },
        },
        {
          name: 'title',
          label: 'Section Title',
          type: 'text',
          required: true,
          defaultValue: 'Ready for Your Next Adventure?',
        },
        {
          name: 'description',
          label: 'Section Description',
          type: 'textarea',
          required: false,
          defaultValue:
            'Book your stay now and experience the beauty of nature with comfortable accommodations.',
        },
        {
          name: 'buttonText',
          label: 'Button Text',
          type: 'text',
          required: true,
          defaultValue: 'Contact Us Today',
        },
        {
          name: 'buttonLink',
          label: 'Button Link',
          type: 'text',
          required: true,
          defaultValue: '/pages/contact',
        },
      ],
    },
    {
      name: 'contactEmail',
      label: 'Contact Email',
      type: 'email',
      required: false,
    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'footerText',
      label: 'Footer Text',
      type: 'textarea',
      required: false,
    },
    // Add more as needed!
  ],
}

export default SiteSettings
