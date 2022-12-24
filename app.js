import express from 'express'
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import routerCarts from './api/carts/carts.js';
import routerProductManager from './api/products/products.js';
import viewsRouter from './src/routes/views.route.js';


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('src/public'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use('/', viewsRouter)
app.use('/', routerProductManager)
app.use('/', routerCarts)

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server UP running in http://localhost:${PORT}`)
})

const socketServer = new Server(server)

socketServer.on('connection', (socket) => {
    console.log('Nueva conexión', socket.id)

    socket.emit('Welcome', { welcome: 'Hola campeón! ya tenemos la tercera'})

    socket.on('disconnect', () => {
        console.log('Desconectado')
    })
})
