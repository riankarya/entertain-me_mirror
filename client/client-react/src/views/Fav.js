import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { QUERY_FAV } from '../helpers/gqlQuery'
import { useQuery } from '@apollo/react-hooks'
import MovieCard from '../components/MovieCard'

export default function Home(props) {
  const history = useHistory()
  const { loading, error, data }= useQuery(QUERY_FAV)
  const listFavorites  = () => {
    return data.favorite.map(elem => {
      console.log(elem, 'asup ti map elem')
      return <MovieCard type="movie" key={elem._id} id={elem._id} name={elem.title} poster_path={elem.poster_path} movie={elem}/>
    })
  }
  if (loading) {
    return <p>loading ...</p>
  } else if (error) {
    return <p>{JSON.stringify(error)}</p>
  } else {
    return (
      <>
        <Button onClick={() => history.push('/')} variant='primary'>Home</Button>
        <Button onClick={() => history.push('/addMovie')} variant='primary'>Add Movie</Button>
        <h1>Home</h1>
          <h1>Favorites</h1>
        <div className='d-flex flex-wrap'>
          {listFavorites()}
        </div>
      </>
    )
  }
}