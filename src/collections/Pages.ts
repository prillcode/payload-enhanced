import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title (e.g., "about", "contact")',
      },
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'gradient',
          type: 'select',
          required: false,
          options: [
            { label: 'Forest', value: 'from-forest-600 to-forest-800' },
            { label: 'Earth', value: 'from-earth-400 to-earth-700' },
            { label: 'Sunset', value: 'from-sunset-500 to-sunset-700' },
            { label: 'Custom', value: 'custom' },
          ],
          defaultValue: 'from-forest-600 to-forest-800',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // Add any additional features you want
        ],
      }),
      required: true,
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Additional Sections',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'sectionContent',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [...defaultFeatures],
          }),
        },
        {
          name: 'layout',
          type: 'select',
          options: [
            { label: 'Full Width', value: 'full' },
            { label: 'Two Columns', value: 'two-column' },
            { label: 'Centered', value: 'centered' },
          ],
          defaultValue: 'full',
        },
        {
          name: 'backgroundColor',
          type: 'select',
          options: [
            { label: 'White', value: 'bg-white' },
            { label: 'Light Earth', value: 'bg-earth-50' },
            { label: 'Light Forest', value: 'bg-forest-50' },
          ],
          defaultValue: 'bg-white',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Comma-separated keywords',
          },
        },
      ],
    },
    // status (Published or Draft)
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    // showInNavigation boolean
    {
      name: 'showInNavigation',
      type: 'checkbox',
      label: 'Show Page in Navigation Menus',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
