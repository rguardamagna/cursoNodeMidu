const http = require('node:http')
const fs = require('node:fs')

const desirePort = process.env.PORT ?? 1234

const processRequest = ((req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (req.url === '/') {
        res.statusCode = 200 //ok
        res.end('Bienvenido a mi página de inicio')
    } else if (req.url === '/imagen-super-bonita.png') {
        fs.readFile('./placa.png', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>500 Internal server error </h1>')
            } else {
                res.setHeader('Content-Type', 'image/png')
                res.end(data)
            }
        })
    } else if (req.url === '/contacto') {
        res.statusCode = 200 //ok
        res.end('<h1>Contacto</h1>')
    } else {
        res.statusCode = '<h1>404</h1>' //not found
    }
})

const server = http.createServer(processRequest)

server.listen(desirePort, () => {
    console.log(`server listening in port http://localhost:${desirePort}`)
})
