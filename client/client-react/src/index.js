import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/react-hooks'
import favoriteVar from './helpers/reactive';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        favorite: {
          read() {
            return favoriteVar();
          }
        }
      }
    }
  }
})
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache
})

ReactDOM.render(
  <ApolloProvider client={ client }>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
