import { type SchemaTypeDefinition } from 'sanity'
import event from './event'
import pastEvent from './pastEvent'
import sensibilise from './sensibilise'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, pastEvent, sensibilise],
}