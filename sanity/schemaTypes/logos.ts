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
            defineField({
              name: "pictureDescription",
              type: "string",
              title: "Tekst alternatywny logo",
              description: "Najlepiej nazwa firmy lub marki widocznej w logo.",
              validation: (Rule) => Rule.required().max(120),
            }),
          ],
          preview: {
            select: {
              title: "pictureDescription",
              media: "picture",
            },
            prepare({ title, media }) {
              return {
                title: title || "Logo partnera",
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
