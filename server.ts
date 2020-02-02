import express, {
  json,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express'
import morgan from 'morgan'
import { serve, setup } from 'swagger-ui-express'
// import carsRouter from './resources/cars/cars.router'

import swaggerDocument from './openapi.json'

const server = express()

const jsonSyntaxErrorHandler = (
  error: ErrorRequestHandler,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof SyntaxError) {
    res.status(400).json({ error: 'JSON syntax error' })
  } else {
    next()
  }
}

server.use('/docs', serve, setup(swaggerDocument))
server.use(morgan('dev'))
server.use(json())
server.use(jsonSyntaxErrorHandler)

// server.use('/api/cars', carsRouter)

server.get('/', (_req, res) => res.send(`<h1>Node DB2 Project</h1>`))

export default server
