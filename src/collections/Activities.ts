import { CollectionConfig } from 'payload'

const Activities: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'activityType',
      type: 'select',
      required: true,
      options: [
        { label: 'Hiking', value: 'hiking' },
        { label: 'Kayaking', value: 'kayaking' },
        { label: 'Fishing', value: 'fishing' },
        { label: 'Cycling', value: 'cycling' },
        { label: 'Wildlife Tour', value: 'wildlife-tour' },
        { label: 'Climbing', value: 'climbing' },
        { label: 'Camping', value: 'camping' },
        { label: 'Photography', value: 'photography' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'text',
      label: 'Short Description (for listings)',
      admin: {
        description: 'Brief description shown in activity lists and cards',
      },
    },
    {
      name: 'pageContent',
      type: 'richText',
      label: 'Additional Page Content (optional)',
      admin: {
        description: 'Optional rich content that will appear below the short description on the activity detail page',
      },
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration (e.g. "2-3 hours", "Full day")',
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Challenging', value: 'challenging' },
        { label: 'Expert', value: 'expert' },
      ],
    },
    {
      name: 'pricePerPerson',
      type: 'number',
      label: 'Price Per Person ($)',
    },
    {
      name: 'minAge',
      type: 'number',
      label: 'Minimum Age',
    },
    {
      name: 'maxParticipants',
      type: 'number',
      label: 'Maximum Participants',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Location Name',
        },
        {
          name: 'address',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'zipCode',
          type: 'text',
        },
      ],
    },
    {
      name: 'season',
      type: 'select',
      options: [
        { label: 'Year-round', value: 'year-round' },
        { label: 'Spring', value: 'spring' },
        { label: 'Summer', value: 'summer' },
        { label: 'Fall', value: 'fall' },
        { label: 'Winter', value: 'winter' },
      ],
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'featuredActivity',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export default Activities
