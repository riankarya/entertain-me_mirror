import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { QUERY_DATA, QUERY_DELETE_MOVIE, QUERY_DELETE_SERIES } from '../helpers/gqlQuery'
import favoriteVar from '../helpers/reactive'

const MovieCard = (props) => {
  console.log(props, 'asup ti moviecard')
  const history = useHistory()
  const [deleteMovie] = useMutation(QUERY_DELETE_MOVIE)
  const [deleteSeries] = useMutation(QUERY_DELETE_SERIES)
  async function deleteMovSer() {
    try {
      if (props.type == 'movie') {
        await deleteMovie({
          variables: {
            id: props.id
          },
          refetchQueries: [{query: QUERY_DATA}]
        })
      } else {
        await deleteSeries({
          variables: {
            id: props.id
          },
          refetchQueries: [{query: QUERY_DATA}]
        })
      }
    }
    catch(  err) {
      console.log(err)
    }
  }

  async function addToFav() {
    try {
      console.log(props.movie, 'asup ti addtofav')
      let newFavMov = {
        _id: props.movie._id,
        overview: props.movie.overview,
        popularity: props.movie.popularity,
        poster_path: props.movie.poster_path,
        tags: props.movie.tags,
        title: props.movie.title
      }
      let favs = [...favoriteVar(), newFavMov]
      console.log(favs)
      favoriteVar(favs)
    } catch(err) {
      console.log(err)
    } 
  }

  return (
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant='top' style={{height: 400}} src={`${props.poster_path}`} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            {props.type == 'movie' && <Button onClick={() => history.push(`/editMovie/${props.id}`)} variant="primary">Edit</Button>}
            {props.type == 'movie' && <Button onClick={addToFav} variant="primary">Add to Fav</Button>}
          <Button onClick={deleteMovSer} variant="primary">Delete</Button>{' '}
          </Card.Body>
        </Card>
      </div>
  )
}

export default MovieCard