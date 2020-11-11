const { gql } = require('apollo-server')
const { axiosMovies } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

const Movies = gql`
  type Movies {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
`

const resolvers = {
  Query: {
    movies: async (parent, args, context) => {
      const moviesCache = await redis.get('moviesCache')
      if (moviesCache) {
        return JSON.parse(moviesCache)
      } else {
        const { data } = await axiosMovies({
          url: '/',
          method: 'get'
        })
        redis.set('moviesCache', JSON.stringify( data ))
        console.log(data, 'asup ti resolvers')
        return data
      }
    },
    movie: async (parent, args, context) => {
      console.log(args.id, 'asup ti skema movie id')
      const { data } = await axiosMovies({
        url: `/${args.id}`,
        method: 'get'
      })
      console.log(data, 'asup ti skema movie');
      return data
    }
  },
  Mutation: {
    addMovie: async (parent, args) => {
      console.log('asup ti mutation')
      const { data } = await axiosMovies({
        url: '/',
        method: 'post',
        data: args
      })
      redis.del('moviesCache')
      return data
    },
    editMovie: async (parent, args) => {
      const { data } = await axiosMovies({
        url: `/${args.id}`,
        method: 'put',
        data: args
      })
      redis.del('moviesCache')
      return { msg: 'success edit' }
    },
    deleteMovie: async (parent, args) => {
      const { data } = await axiosMovies({
        url: `/${args.id}`,
        method: 'delete',
        data: args
      })
      redis.del('moviesCache')
      return { msg: 'success delete' }
    }
  }
}

module.exports = { Movies, resolvers }