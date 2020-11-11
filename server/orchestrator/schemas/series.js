const { gql } = require('apollo-server')
const { axiosSeries } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

const Series = gql`
  type Series {
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
    series: async (parent, args, context) => {
      const seriesCache = await redis.get('seriesCache')
      if (seriesCache) {
        return JSON.parse(seriesCache)
      } else {
        const { data } = await axiosSeries({
          url: '/',
          method: 'get'
        })
        redis.set('seriesCache', JSON.stringify( data ))
        console.log(data, 'asup ti resolvers')
        return data
      }
    }
  },
  Mutation: {
    addSeries: async (parent, args) => {
      console.log('asup ti mutation')
      const { data } = await axiosSeries({
        url: '/',
        method: 'post',
        data: args
      })
      redis.del('seriesCache')
      return data
    },
    editSeries: async (parent, args) => {
      const { data } = await axiosSeries({
        url: `/${args.id}`,
        method: 'put',
        data: args
      })
      redis.del('seriesCache')
      return { msg: 'success edit' }
    },
    deleteSeries: async (parent, args) => {
      const { data } = await axiosSeries({
        url: `/${args.id}`,
        method: 'delete',
        data: args
      })
      redis.del('seriesCache')
      return { msg: 'success delete' }
    }
  }
}

module.exports = { Series, resolvers }