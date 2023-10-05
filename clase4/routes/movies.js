import { Router } from 'express'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js'

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
  const { genre } = req.query
  const movies = await MovieModel.getAll({ genre })
  res.json(movies)
})

moviesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.getById({ id })
  if (movie) return res.json(movie)
  res.status(404).json({ message: '404 Not Found' })
})

moviesRouter.post('/', async (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  // Luego a base de datos

  const newMovie = await MovieModel.create({ input: result.data })

  res.status(201).json(newMovie)
})

moviesRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const result = await MovieModel.delete({ id })

  if (result === false) {
    return res.status(404).json({ message: '404 Not Found' })
  }

  return res.json({ message: 'Movie deleted' })
})
moviesRouter.patch('/movies/:id', async (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params

  const updateMovie = await MovieModel.update({ id, input: result.data })

  return res.json(updateMovie)
})
