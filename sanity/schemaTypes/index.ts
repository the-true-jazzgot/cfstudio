import { type SchemaTypeDefinition } from 'sanity'
import { generalSettingsType } from './generalSettingsType'
import { servicesType } from './services'
import { logosType } from './logos'
import { portfolioType } from './portfolio'
import { statsType } from './stats'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [generalSettingsType, servicesType, logosType, portfolioType, statsType],
}
