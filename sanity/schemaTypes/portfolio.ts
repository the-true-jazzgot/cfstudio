import { defineField, defineType } from "sanity";

export const portfolioType = defineType({
  name: "portfolio",
  title: "Portfolio projektów",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Nagłówek sekcji portfolio",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projects",
      type: "array",
      title: "Projekty w portfolio",
      of: [
        {
          type: "object",
          title: "Projekt portfolio",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Obraz projektu",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              type: "string",
              title: "Nazwa projektu",
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Opis projektu",
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title || "Projekt portfolio",
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Portfolio projektów",
      };
    },
  },
});
