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
    ])
