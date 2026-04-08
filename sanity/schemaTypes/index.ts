import { type SchemaTypeDefinition } from 'sanity'
import { generalSettingsType } from './generalSettingsType'
import { servicesType } from './services'
import { logosType } from './logos'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [generalSettingsType, servicesType, logosType],
}
