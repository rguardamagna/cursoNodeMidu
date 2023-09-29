const express = require('express')
const ditt = require('./pokemon/ditto.json')
const app = express()

const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')

// app.use((req, res, next)=>{ // se puede usar en un metodo en concreto o para urls especificas
//     //trackear la request a la base de datos
//     // revisar si el usuario tiene cookies
//     console.log('mi primer middleware')
//     next()
// })

// esto hace lo mismo (evalua POST y Cont Type y devuelve el chunk - no el datetime que es lógica personalizada)
//app.use(express.json()) 
app.use((req, res, next)=>{ // se puede usar en un metodo en concreto o para urls especificas
    if (req.method !== 'POST') return next()
    if (req.headers['content-type'] !== 'application/json') return next()
    
    // solo llegan POST y application/json
    let body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        const data = JSON.parse(body)
        // llamar a una base de datos para guardar la info
        data.datetime = Date.now()
        req.body=data
        next()
    })
})

app.get('/pokemon/ditto', (req,res) => {
    //res.json({ message: 'hola mundo'})
    res.json(ditto) // no es necesario declarar el Contet-Type
    
})

app.post('/pokemon', (req,res) => {
    res.status(201).json(req.body)
})

app.use((req,res)=>{
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})

