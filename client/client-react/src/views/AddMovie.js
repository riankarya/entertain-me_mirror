import React from 'react'
import { QUERY_MOVIE, QUERY_DATA, QUERY_ADD_MOVIE } from '../helpers/gqlQuery'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import {useForm} from 'react-hook-form'

export default function EditMovie(props) {
  const history = useHistory()
  const [addMovie] = useMutation(QUERY_ADD_MOVIE)
  const { register, handleSubmit, errors } = useForm()

  async function submitForm(data) {
    try {
      await addMovie({
        variables: {
          title: data.title,
          overview: data.overview,
          poster_path: data.poster_path,
          popularity : parseFloat(data.popularity),
          tags: data.tags.split(' ')
        },
        refetchQueries: [{query: QUERY_DATA}]
      })
      history.push('/')
    }
    catch(err) {
      console.log(err)
    }
  }

  return <>
  <Button onClick={() => history.push('/')} variant='primary'>Home</Button>
  <h1>Add Page</h1>
  <Form onSubmit={handleSubmit(submitForm)}>
    <Form.Group controlId="title">
      <Form.Label>Title</Form.Label>
      <Form.Control name="title" type="text" placeholder="Enter title" ref={register({required: 'Please input title'})} />
      {errors.title && <p style={{color: 'red'}}>{errors.title.message}</p>}
    </Form.Group>
    <Form.Group controlId="overview">
      <Form.Label>Overview</Form.Label>
      <Form.Control name="overview" type="text" placeholder="Enter overview" ref={register({required: 'Please input overview'})} />
      {errors.overview && <p style={{color: 'red'}}>{errors.overview.message}</p>}
    </Form.Group>
    <Form.Group controlId="poster_path">
      <Form.Label>Poster Path</Form.Label>
      <Form.Control name="poster_path" type="text" placeholder="Enter poster path" ref={register({required: 'Please input poster path'})} />
      {errors.poster_path && <p style={{color: 'red'}}>{errors.poster_path.message}</p>}
    </Form.Group>
    <Form.Group controlId="popularity">
      <Form.Label>Popularity</Form.Label>
      <Form.Control name="popularity" type="number" step=".1" placeholder="Enter popularity" ref={register({required: 'Please input popularity'})} />
      {errors.popularity && <p style={{color: 'red'}}>{errors.popularity.message}</p>}
    </Form.Group>
    <Form.Group controlId="tags">
      <Form.Label>Tags</Form.Label>
      <Form.Control name="tags" type="text" placeholder="Enter tags" ref={register({required: 'Please input tags'})} />
      {errors.tags && <p style={{color: 'red'}}>{errors.tags.message}</p>}
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
  </Form>
  </>
}