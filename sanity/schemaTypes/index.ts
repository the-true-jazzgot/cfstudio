import { type SchemaTypeDefinition } from 'sanity'
import { generalSettingsType } from './generalSettingsType'
import { servicesType } from './services'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [generalSettingsType, servicesType],
}
