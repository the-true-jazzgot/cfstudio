import { defineField, defineType } from "sanity";

export const logosType = defineType({
  name: 'logos',
  title: 'Logos',
  type: 'document',
  fields: [
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
          ],
        },
      ],
      description: 'Loga (wymiary 300 x 200 px) będą wyświetlane w sekcji "Zaufali nam" na stronie głównej',
    }),
  ],
});