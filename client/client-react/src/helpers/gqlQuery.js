import { gql } from 'apollo-boost'

export const QUERY_DATA = gql`
  {
    movies {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    series {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`
export const QUERY_MOVIE = gql`
  query Movie($id: ID!) {
    movie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`
export const QUERY_MOVIES = gql`
  query {
    movies {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`
export const QUERY_ADD_MOVIE = gql`
  mutation AddMovie($title:String, $overview:String, $poster_path:String, $popularity:Float, $tags:[String]) {
    addMovie (title: $title, overview: $overview, poster_path : $poster_path, popularity : $popularity, tags : $tags) {
      title, overview, poster_path, popularity, tags
    }
  }
`
export const QUERY_EDIT_MOVIE = gql`
  mutation EditMovie($id:String, $title:String, $overview:String, $poster_path:String, $popularity:Float, $tags:[String]) {
    editMovie (id: $id, title: $title, overview: $overview, poster_path : $poster_path, popularity : $popularity, tags : $tags) {
      msg
    }
  }
`
export const QUERY_DELETE_MOVIE = gql`
  mutation DeleteMovie($id:String) {
    deleteMovie (id: $id) {
      msg
    }
  }
`
export const QUERY_SERIES = gql`
  query {
    series {
      _id,
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
  }
`
export const QUERY_ADD_SERIES = gql`
  mutation AddMovie($title:String, $overview:String, $poster_path:String, $popularity:Float, $tags:[String]) {
    addMovie (title: $title, overview: $overview, poster_path : $poster_path, popularity : $popularity, tags : $tags) {
      title, overview, poster_path, popularity, tags
    }
  }
`
export const QUERY_EDIT_SERIES = gql`
  mutation EditMovie($id:String, $title:String, $overview:String, $poster_path:String, $popularity:Float, $tags:[String]) {
    editMovie (id: $id, title: $title, overview: $overview, poster_path : $poster_path, popularity : $popularity, tags : $tags) {
      msg
    }
  }
`
export const QUERY_DELETE_SERIES = gql`
  mutation DeleteSeries($id:String) {
    deleteSeries (id: $id) {
      msg
    }
  }
`
export const QUERY_FAV = gql`
  query {
    favorite @client {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`