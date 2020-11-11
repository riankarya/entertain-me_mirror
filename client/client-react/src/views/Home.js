import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { QUERY_DATA } from '../helpers/gqlQuery'
import { useQuery } from '@apollo/react-hooks'
import MovieCard from '../components/MovieCard'

export default function Home(props) {
  const history = useHistory()
  const { loading, error, data } = useQuery(QUERY_DATA)
  const listMovies  = () => {
    return data.movies.map(elem => {
      console.log(elem, 'asup ti map elem')
      return <MovieCard type="movie" key={elem._id} id={elem._id} name={elem.title} poster_path={elem.poster_path} movie={elem}/>
    })
  }
  const listSeries  = () => {
    return data.series.map(elem => {
      console.log(elem, 'asup ti map elem')
      return <MovieCard type="series" key={elem._id} id={elem._id} name={elem.title} poster_path={elem.poster_path}/>
    })
  }
  if (loading) {
    return <p>loading ...</p>
  } else if (error) {
    return <p>{JSON.stringify(error)}</p>
  } else {
    return (
      <>
        <Button onClick={() => history.push('/addMovie')} variant='primary'>Add Movie</Button>
        <Button onClick={() => history.push('/fav')} variant='primary'>Favorites</Button>
        <h1>Home</h1>
          <h1>Movies</h1>
        <div className='d-flex flex-wrap'>
          {listMovies()}
        </div>
          <h1>Series</h1>
        <div className='d-flex flex-wrap'>
          {listSeries()}
        </div>
      </>
    )
  }
}