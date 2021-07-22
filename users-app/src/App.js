import './App.css';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { CREATE_USER, GET_USERS } from './GraphQL/Query';

function App() {
  // MUTATION
  const [createUser, {data : mutateData}] = useMutation(CREATE_USER)
  console.log("DATA - ", mutateData);
  // QUERY
  const {data, loading, error} = useQuery(GET_USERS)
  if(error) return <p>ERROR - {error}</p>
  if(loading) return <p>Loading the data from server....</p>
  if(data){
    return (
      <div>
        <h1>Awesome App</h1>
        <ul>
          {data.users.map(user => {
            return <li key={user.id}>
              {user.name} - {user.email}
            </li>
          })}
        </ul>
          <button onClick={() => createUser()}>Create New User</button>
      </div>
    )
  }
}

export default App;
