import express, { Request, Response } from "express"
import cors from "cors"
import { conectarDB } from "./infrastructure/db/db"
import indexRoutes from "./presentation/routes/index.routes"

export const STAGE = process.env.STAGE || "dev"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/", indexRoutes)

const PORT = process.env.PORT || 4000

const services = [
  {
    empresa: "ITEMU",
    backendDomain: "http://204.48.30.100:3002",
  },
  {
    empresa: "LOCAL",
    backendDomain: "http://localhost:3000",
  },
]

app.use("/:empresa", (req: Request, res: Response) => {
  const { empresa } = req.params
  const empresaObj = services.find((e) => e.empresa === empresa)

  if (!empresaObj) {
    res.status(404).json({ error: "Empresa no encontrada" })
    return
  }

  console.log(empresaObj)

  res.json(empresaObj)
  return
})

app.listen(PORT, () => {
  console.log(`Proxy activo en http://localhost:${PORT}`)
  conectarDB()
})
