import express, { Request, Response, ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import routesClan from "./routes/routes_clan";

dotenv.config()

const server = express()
server.use(cors())
// server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(routesClan)

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({
    error: "Endpoint não encontrado"
  })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400)
  console.log(err)
  res.json({
    error: "Ocorreu algum erro"
  })
}

server.use(errorHandler)
server.listen(process.env.PORT)