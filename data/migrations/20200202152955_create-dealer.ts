import Knex, { SchemaBuilder } from 'knex'

export const up = (knex: Knex): SchemaBuilder =>
  knex.schema.createTable('cars', table => {
    table.increments()
    table
      .string('vin', 17)
      .unique()
      .notNullable()
    table.string('make').notNullable()
    table.string('model').notNullable()
    table.integer('mileage').notNullable()
    table.string('transmission')
    table.string('title')
  })

export const down = (knex: Knex): SchemaBuilder =>
  knex.schema.dropTableIfExists('cars')
