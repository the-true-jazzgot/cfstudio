import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('General Settings')
        .id('generalSettings')
        .child(
          S.editor()
            .id('generalSettings')
            .schemaType('generalSettings')
            .documentId('generalSettings')
        ),
      S.listItem()
        .title('Services')
        .id('services')
        .child(
          S.documentTypeList('services')
            .title('Services')
        ),
      S.listItem()
        .title('Logos')
        .id('logos')
        .child(
          S.editor()
            .id('logos')
            .schemaType('logos')
            .documentId('logos')
        )
    ])
