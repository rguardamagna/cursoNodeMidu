const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

app.get('/', (req, res) => { 
    res.json({message:'hola mundo'})
})

app.get('/movies', (req, res) => { 
    const { genre } = req.query
    if (genre) { 
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.status(201).json(movies)
})

app.get('/movies/:id', (req, res) => { //path-to-regex
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id) 
    if (movie) return res.json(movie)
    
    res.status(404).json({message: '404 Not Found'})
    
    res.status(201).json(movies[{id}])
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`listening in port http://localhost:${PORT}`)
})