const express = require('express')
const port = 5002
const app = express()
const route = require('./routes/route')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', route)

app.listen(port, () => console.log(`I love you ${port}`))