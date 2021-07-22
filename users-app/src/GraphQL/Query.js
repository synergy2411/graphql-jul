import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query {
        users {
            id name email
        }
    }
`

export const CREATE_USER = gql`
    mutation {
        createUser(data : {
            name : "sumit k",
            email: "sumit11@test.com",
            password : "sumit123"
        }){
            id name email password
        }
    }
`