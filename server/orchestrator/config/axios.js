const axios = require('axios')

const axiosMovies = axios.create({
    baseURL: 'http://localhost:5001'
  })
const axiosSeries = axios.create({
    baseURL: 'http://localhost:5002'
  })

module.exports = { axiosMovies, axiosSeries }