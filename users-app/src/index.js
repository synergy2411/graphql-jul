import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri : "https://sk-graphql-prisma.herokuapp.com/",
  cache : new InMemoryCache()
})

// client.query({
//   query : gql`
//     query {
//       users {
//         id name email
//       }
//     }
//   `
// }).then(response => {
//   console.log("RESPONSE - ", response)
// }).catch(err => console.log("ERROR -", err))


ReactDOM.render(
  <ApolloProvider client= {client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
