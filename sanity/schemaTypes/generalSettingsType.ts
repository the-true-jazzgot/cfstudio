import {defineField, defineType} from 'sanity'

export const generalSettingsType = defineType({
  name: 'generalSettings',
  title: 'General Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      validation: (Rule) => Rule.required(),
        title: 'Logo',
        options: {
          hotspot: true,
        }
    }),
    defineField({
      name: 'altforlogo',
      type: 'string',
      title: 'Alt Text For Logo',
      description: "Very important for SEO and accessibility.",
    }),
    defineField({
      name: 'number',
      type: 'string',
      title: 'Phone Number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Email Address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'welcomePicture',
      type: 'image',
      description: 'Picture that will be displayed on the welcome section',
      validation: (Rule) => Rule.required(),
        title: 'Welcome Picture',
        options: {
          hotspot: true,
        }
    }),
  ],
})