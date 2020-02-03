import Knex from 'knex'

exports.seed = (knex: Knex): Promise<number> =>
  // Deletes ALL existing entries
  knex('cars')
    .truncate()
    .then(() =>
      // Inserts seed entries
      knex('cars').insert([
        {
          id: 3,
          vin: '19XFB2F5XCE060916',
          make: 'Fiat',
          model: '500',
          mileage: 1267,
          transmission: 'manual',
          title: 'salvage',
        },
        {
          id: 2,
          vin: '1FDWE3FL0DDA71580',
          make: 'Ford',
          model: 'F150',
          mileage: 23675,
          transmission: 'automatic',
          title: 'salvage',
        },
        {
          id: 37,
          vin: '3VWRK69M93M177185',
          make: 'Honda',
          model: 'Civic',
          mileage: 165499,
          transmission: 'automatic',
          title: 'clean',
        },
        {
          id: 6,
          vin: '3LNHM26T57R639971',
          make: 'Suburu',
          model: 'Impreza',
          mileage: 55487,
          transmission: 'manual',
          title: 'clean',
        },
        {
          id: 12,
          vin: '1D4HB48D14F176699',
          make: 'Toyota',
          model: 'Camry',
          mileage: 48351,
          transmission: 'automatic',
          title: 'clean',
        },
        {
          id: 7,
          vin: '1D4HD48N56F157983',
          make: 'Chevy',
          model: 'Volt',
          mileage: 6574,
          transmission: 'automatic',
        },
        {
          id: 8,
          vin: '1N4AL2EP9BC125146',
          make: 'Honda',
          model: 'Fit',
          mileage: 77987,
        },
      ])
    )
