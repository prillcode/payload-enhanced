import { CollectionConfig } from 'payload'

const Accommodations: CollectionConfig = {
  slug: 'accommodations',
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
      name: 'rentalType',
      type: 'select',
      required: true,
      options: [
        { label: 'Cabin', value: 'cabin' },
        { label: 'House', value: 'house' },
        { label: 'Apartment', value: 'apartment' },
        { label: 'Duplex', value: 'duplex' },
        { label: 'Condo', value: 'condo' },
        { label: 'Villa', value: 'villa' },
        { label: 'Room', value: 'room' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'text',
      label: 'Short Description (for listings)',
      admin: {
        description: 'Brief description shown in accommodation lists and cards',
      },
    },
    {
      name: 'pageContent',
      type: 'richText',
      label: 'Additional Page Content (optional)',
      admin: {
        description: 'Optional rich content that will appear below the short description on the accommodation detail page',
      },
    },
    {
      name: 'pricePerNight',
      type: 'number',
      required: true,
    },
    {
      name: 'maxGuests',
      type: 'number',
      required: true,
    },
    {
      name: 'bedrooms',
      type: 'number',
    },
    {
      name: 'bathrooms',
      type: 'number',
    },
    {
      name: 'amenities',
      type: 'array',
      fields: [
        {
          name: 'amenity',
          type: 'text',
        },
      ],
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
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Accommodations
