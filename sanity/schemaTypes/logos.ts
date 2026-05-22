import { defineField, defineType } from "sanity";

export const logosType = defineType({
  name: "logos",
  title: "Logotypy - sekcja Zaufali nam",
  type: "document",
  fields: [
    defineField({
      name: "gallery",
      type: "array",
      title: "Logotypy - sekcja Zaufali nam",
      of: [
        {
          type: "object",
          title: "Logo partnera",
          fields: [
            defineField({
              name: "picture",
              type: "image",
              title: "Plik logo",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              media: "picture",
            },
            prepare({ media }) {
              return {
                title: "Logo partnera",
                media,
              };
            },
          },
        },
      ],
      description:
        'Loga (wymiary 300 x 200 px) będą wyświetlane w sekcji "Zaufali nam" na stronie głównej',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Logotypy - sekcja Zaufali nam",
      };
    },
  },
});
