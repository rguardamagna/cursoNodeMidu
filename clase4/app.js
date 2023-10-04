import express, { json } from 'express'
// import movies from './movies.json' assert {type: 'json'} // Esta sintaxis no va
// import movies from './movies.json' with { type: 'json' } // Sintaxis aún no soportada

import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// leer un json en EModules
// import fs from 'node.js'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

const app = express()
app.use(json())
app.use(corsMiddleware())

app.disable('x-powered-by')

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => {
  console.log(`listening in port http://localhost:${PORT}`)
})
