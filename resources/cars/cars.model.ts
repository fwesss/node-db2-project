import { QueryBuilder } from 'knex'
import db from '../../data/dbConfig'

export type Id = number | string

export type Car = {
  vin: string
  make: string
  model: string
  mileage: number
  transmission?: string
  title?: string
}

export const findAll = (
  limit: number,
  sortBy = 'id',
  sortDir = 'asc'
): QueryBuilder =>
  db('cars')
    .limit(limit)
    .orderBy(sortBy, sortDir)

export const findById = (id: Id): QueryBuilder =>
  db('cars')
    .where({ id: Number(id) })
    .first()

export const insert = (car: Car): Promise<QueryBuilder> =>
  db('cars')
    .insert(car, 'id')
    .then(([id]) => findById(id))

export const update = (id: Id, car: Car): Promise<QueryBuilder> =>
  db('cars')
    .where('id', Number(id))
    .update(car)
    .then(count => count > 0 && findById(id))

export const remove = (id: Id): QueryBuilder =>
  db('cars')
    .where('id', Number(id))
    .del()

export default {
  findAll,
  findById,
  insert,
  update,
  remove,
}
