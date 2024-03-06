import express from 'express'
import cors from 'cors'

import { importRoute } from './importRoute.js'
import { exportRoute } from './exportRoute.js'

const app = express()

app.use(express.json())

app.use(cors())

app.post('/api/importRoute', async (req, res) => {
  try {
    const route = await importRoute(req.body.str)
    res.json(route)
  } catch (e) {
    res.status(422).send(e.message)
  }
})

app.post('/api/exportRoute', async (req, res) => {
  try {
    const route = await exportRoute(req.body.mdtRoute)
    res.json(route)
  } catch (e) {
    console.error(e)
    throw e
  }
})

const { PORT = 6173 } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
