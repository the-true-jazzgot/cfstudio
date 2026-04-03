import { type SchemaTypeDefinition } from 'sanity'
import { generalSettingsType } from './generalSettingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [generalSettingsType],
}
