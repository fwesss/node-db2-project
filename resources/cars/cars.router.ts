import express, { Request, Response, NextFunction } from 'express'
import Validation from 'folktale/validation'
import { validator, didItValidate, Matcher } from '../../utils/validator'
import controllers from './cars.controllers'
import dbErrorHandler from '../../utils/dbErrorHandler'
import { findById } from './cars.model'

const { Success } = Validation

const router = express.Router()

const hasBody = (req: Request): boolean => !!req.body
const hasVin = (req: Request): boolean => !!req.body.vin
const hasMake = (req: Request): boolean => !!req.body.make
const hasModel = (req: Request): boolean => !!req.body.model
const hasMileage = (req: Request): boolean => !!req.body.mileage
const realMileage = (req: Request): boolean =>
  typeof req.body.mileage === 'number' && req.body.mileage >= 0

const bodyValidator = validator('Missing car data', hasBody)
const vinValidator = validator('Missing VIN', hasVin)
const makeValidator = validator('Missing make', hasMake)
const modelValidator = validator('Missing model', hasModel)
const mileageValidator = validator('Missing mileage', hasMileage)
const realMileageValidator = validator(
  'Mileage must be a positive number',
  realMileage
)

const carValidationResult = (req: Request): Matcher =>
  Success()
    .concat(bodyValidator(req))
    .concat(vinValidator(req))
    .concat(makeValidator(req))
    .concat(modelValidator(req))
    .concat(mileageValidator(req))
    .concat(realMileageValidator(req))

const validateCar = (req: Request, res: Response, next: NextFunction): void => {
  const didCarValidate = didItValidate(carValidationResult(req))

  if (!didCarValidate) {
    res.status(400).json({ errors: carValidationResult(req).value })
  } else {
    next()
  }
}

const validateCarId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const car = await findById(req.params.id)
    if (car) {
      next()
    } else {
      res.status(404).json({ error: 'Invalid car ID' })
    }
  } catch (error) {
    dbErrorHandler(error, res)
  }
}

router.use('/:id', validateCarId)

router
  .route('/')
  .get(controllers.getMany)
  .post(validateCar, controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(validateCar, controllers.updateOne)
  .delete(controllers.removeOne)

export default router
