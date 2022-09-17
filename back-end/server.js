const express = require('express')
const cors = require('cors')

const pageRoutes = require('./routes/pages')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use('/', pageRoutes)

app.listen(3001, ()=> {
    console.log('Listening through port 3001')
})