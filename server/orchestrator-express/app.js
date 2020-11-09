const express = require('express')
const app = express()
const axios = require('axios')
const port = 5000
const route = require('./routes/route')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', route)

app.listen(port, () => console.log(`I love you ${port}`))