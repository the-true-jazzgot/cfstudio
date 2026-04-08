import {defineField, defineType} from 'sanity'

export const servicesType = defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Service Name',
      validation: (Rule) => Rule.required().max(100),
      description: 'The name of the service',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'URL-friendly identifier for the service',
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
      description: 'Opis usługi, który będzie wyświetlany na stronie',
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      title: 'Service Gallery',
      of: [
        {
          type: 'object',
          title: 'Przykładowe realizacje',
          fields: [
            defineField({
              name: 'picture',
              type: 'image',
              title: 'Picture',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'pictureDescription',
              type: 'string',
              title: 'Picture Description',
              validation: (Rule) => Rule.required().max(200),
              description: 'Opis realizacji',
            }),
          ],
        },
      ],
      description: 'Array of pictures with descriptions',
    }),
  ],
});