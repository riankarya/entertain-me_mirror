import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QUERY_MOVIES, QUERY_ADD_MOVIE, QUERY_EDIT_MOVIE, QUERY_DELETE_MOVIE } from './helpers/gqlQuery'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Home from './views/Home'
import EditMovie from './views/EditMovie'
import AddMovie from './views/AddMovie'
import Fav from './views/Fav'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/editMovie/:id">
            <EditMovie />
          </Route>
          <Route exact path="/addMovie">
            <AddMovie />
          </Route>
          <Route exact path="/fav">
            <Fav />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}