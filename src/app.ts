import express, { Request, Response, ErrorRequestHandler } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import path from 'path'
import routesClan from "./routes/routesClan";
import routesGameTitle from "./routes/routesGameTitle";
import routesCharacter from "./routes/routesCharacter";

dotenv.config()

const server = express()
server.use(cors())
// server.use(express.static(path.join(__dirname, '../public')))
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use('/clan', routesClan)
server.use('/gameTitle', routesGameTitle)
server.use("/character", routesCharacter);

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({
    error: "Endpoint não encontrado"
  })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400)
  res.json({
    error: "Ocorreu algum erro"
  })
}

server.use(errorHandler)

export default server