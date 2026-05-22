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
      name: 'seoTitle',
      type: 'string',
      title: 'SEO - tytuł strony',
      description: 'Tytuł widoczny w wynikach wyszukiwania i karcie przeglądarki.',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      title: 'SEO - opis strony',
      description: 'Meta description widoczne w wynikach wyszukiwania.',
      rows: 3,
      validation: (Rule) => Rule.max(170),
    }),
    defineField({
      name: 'seoKeywords',
      type: 'array',
      title: 'SEO - słowa kluczowe',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogTitle',
      type: 'string',
      title: 'Social media - tytuł',
      description: 'Opcjonalny tytuł dla udostępnień. Jeśli puste, użyty zostanie tytuł SEO.',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'ogDescription',
      type: 'text',
      title: 'Social media - opis',
      description: 'Opcjonalny opis dla udostępnień. Jeśli pusty, użyty zostanie opis SEO.',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'ogImage',
      type: 'image',
      title: 'Social media - obraz udostępnienia',
      description: 'Rekomendowany format: 1200 x 630 px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ogImageAlt',
      type: 'string',
      title: 'Social media - tekst alternatywny obrazu',
      validation: (Rule) => Rule.max(160),
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
      name: 'welcomePictureAlt',
      type: 'string',
      title: 'Tekst alternatywny obrazu sekcji powitalnej',
      validation: (Rule) => Rule.required().max(160),
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
            {title: 'Standardowy - do lewej', value: 'normal'},
            {title: 'Standardowy - do środka', value: 'normalCenter'},
            {title: 'Standardowy - do prawej', value: 'normalRight'},
            {title: 'Duży nagłówek - do lewej', value: 'headingLarge'},
            {title: 'Duży nagłówek - do środka', value: 'headingLargeCenter'},
            {title: 'Duży nagłówek - do prawej', value: 'headingLargeRight'},
            {title: 'Największy nagłówek - do lewej', value: 'headingHuge'},
            {title: 'Największy nagłówek - do środka', value: 'headingHugeCenter'},
            {title: 'Największy nagłówek - do prawej', value: 'headingHugeRight'},
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
