import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Treść strony')
    .items([
      S.listItem()
        .title('Ustawienia globalne')
        .id('generalSettings')
        .child(
          S.editor()
            .title('Ustawienia globalne')
            .id('generalSettings')
            .schemaType('generalSettings')
            .documentId('generalSettings')
        ),
      S.listItem()
        .title('Usługi')
        .id('services')
        .child(
          S.documentTypeList('services')
            .title('Usługi')
        ),
      S.listItem()
        .title('Logotypy - sekcja Zaufali nam')
        .id('logos')
        .child(
          S.editor()
            .title('Logotypy - sekcja Zaufali nam')
            .id('logos')
            .schemaType('logos')
            .documentId('logos')
        ),
      S.listItem()
        .title('Portfolio projektów')
        .id('portfolio')
        .child(
          S.editor()
            .title('Portfolio projektów')
            .id('portfolio')
            .schemaType('portfolio')
            .documentId('portfolio')
        ),
      S.listItem()
        .title('Liczniki - sekcja z liczbami')
        .id('stats')
        .child(
          S.editor()
            .title('Liczniki - sekcja z liczbami')
            .id('stats')
            .schemaType('stats')
            .documentId('stats')
        )
    ])
