import {defineField, defineType} from 'sanity'

export const generalSettingsType = defineType({
  name: 'generalSettings',
  title: 'Ustawienia globalne',
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
      title: 'Tekst alternatywny logo',
      description: "Ważne dla SEO i dostępności.",
    }),
    defineField({
      name: 'number',
      type: 'string',
      title: 'Numer telefonu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
      title: 'Adres e-mail',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'welcomePicture',
      type: 'image',
      description: 'Obraz wyświetlany w sekcji powitalnej',
      validation: (Rule) => Rule.required(),
        title: 'Obraz sekcji powitalnej',
        options: {
          hotspot: true,
        }
    }),
    defineField({
      name: 'welcomeTitle',
      type: 'text',
      title: 'Nagłówek sekcji powitalnej',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'welcomeRichText',
      type: 'array',
      title: 'Treść sekcji "Kreatywne rozwiązania"',
      description: 'Edytowalny tekst z możliwością ustawienia wyróżnień, koloru i rozmiaru fragmentów.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Standardowy', value: 'normal'},
            {title: 'Duży nagłówek', value: 'headingLarge'},
            {title: 'Największy nagłówek', value: 'headingHuge'},
          ],
          fields: [
            defineField({
              name: 'alignment',
              type: 'string',
              title: 'Wyrównanie tekstu',
              options: {
                list: [
                  {title: 'Do lewej', value: 'left'},
                  {title: 'Do środka', value: 'center'},
                  {title: 'Do prawej', value: 'right'},
                ],
                layout: 'radio',
              },
              initialValue: 'left',
            }),
          ],
          lists: [],
          marks: {
            decorators: [
              {title: 'Pogrubienie', value: 'strong'},
              {title: 'Kursywa', value: 'em'},
            ],
            annotations: [
              {
                name: 'textColor',
                type: 'object',
                title: 'Kolor tekstu',
                fields: [
                  defineField({
                    name: 'color',
                    type: 'string',
                    title: 'Kolor',
                    options: {
                      list: [
                        {title: 'Biały', value: '#ffffff'},
                        {title: 'Czarny', value: '#111827'},
                        {title: 'Turkusowy', value: '#20bdc0'},
                        {title: 'Szary', value: '#bcbec0'},
                      ],
                    },
                  }),
                ],
              },
              {
                name: 'textSize',
                type: 'object',
                title: 'Rozmiar tekstu',
                fields: [
                  defineField({
                    name: 'size',
                    type: 'string',
                    title: 'Rozmiar',
                    options: {
                      list: [
                        {title: 'Mały', value: '0.85em'},
                        {title: 'Standardowy', value: '1em'},
                        {title: 'Duży', value: '1.2em'},
                        {title: 'Bardzo duży', value: '1.45em'},
                      ],
                    },
                  }),
                ],
              },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'aboutTitle',
      type: 'string',
      title: 'Nagłówek sekcji tekstowej',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aboutDescription',
      type: 'text',
      title: 'Opis sekcji tekstowej',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Ustawienia globalne',
      };
    },
  },
})
