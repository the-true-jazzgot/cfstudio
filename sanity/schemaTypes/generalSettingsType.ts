import {defineField, defineType} from 'sanity'

export const generalSettingsType = defineType({
  name: 'generalSettings',
  title: 'General Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
        title: 'Logo',
        options: {
          hotspot: true,
        }
    }),
  ],
})