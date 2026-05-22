import { defineField, defineType } from "sanity";

export const statsType = defineType({
  name: "stats",
  title: "Liczniki - sekcja z liczbami",
  type: "document",
  fields: [
    defineField({
      name: "items",
      type: "array",
      title: "Liczniki",
      of: [
        {
          type: "object",
          title: "Licznik",
          fields: [
            defineField({
              name: "value",
              type: "number",
              title: "Liczba",
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: "label",
              type: "string",
              title: "Podpis pod liczbą",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              value: "value",
              label: "label",
            },
            prepare({ value, label }) {
              return {
                title: value !== undefined ? `${value}` : "Licznik",
                subtitle: label,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Liczniki - sekcja z liczbami",
      };
    },
  },
});
