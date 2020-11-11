const { ApolloServer, gql } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')
const { Movies, resolvers: movieResolvers } = require('./schemas/movies')
const { Series, resolvers: seriesResolvers } = require('./schemas/series')

const Query = gql`
  type Query {
    movies: [Movies]
    series: [Series]
    movie(id: ID!): Movies
  }

  type Mutation {
    addMovie (title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : Movies
    editMovie (id: String, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : updateResponse
    deleteMovie (id: String) : updateResponse
    addSeries (title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : Series
    editSeries (id: String, title: String, overview: String, poster_path: String, popularity: Float, tags: [String]) : updateResponse
    deleteSeries (id: String) : updateResponse
  }

  type updateResponse {
    msg: String
  }
`

const schema = makeExecutableSchema({
  typeDefs: [Query, Movies, Series],
  resolvers: [movieResolvers, seriesResolvers]
})

const server = new ApolloServer({schema})
server.listen().then(({ url }) => {
  console.log(`I love you ${url}`)
})