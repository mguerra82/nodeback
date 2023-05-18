import express from 'express'
import emplyeeRoutes from './routes/employees.route.js'
import indexRoutes from './routes/index.routes.js'


const app = express()

/**
 * Permite combertir los datos a json
 */
app.use(express.json())


app.use(indexRoutes)

/**
 * '/api'
 * asigna el prefijo api a cada ruta creada para el servicio 
 */
app.use('/api', emplyeeRoutes)

app.listen(3000)

