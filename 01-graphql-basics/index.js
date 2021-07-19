// CommonJS Module Syntax
// const { GraphQLServer } = require("graphql-yoga");
// ES6 Module 
import { GraphQLServer } from 'graphql-yoga';

const users = [
    {id : "101", name : "john doe", email : "john@test.com", age : 32},
    {id : "102", name : "jenny doe", email : "jenny@test.com", age : 33},
    {id : "103", name : "james doe", email : "james@test.com", age : 34},
    {id : "104", name : "alice doe", email : "alice@test.com", age : 35},
]
const posts = [
    {id : "201", title : "GraphQL Beginners", body : "Awesome course", published : true, author : "101"},
    {id : "202", title : "GraphQL 101", body : "Great course", published : false, author : "101"},
    {id : "203", title : "GraphQL eBook", body : "....", published : true, author : "102"},
    {id : "204", title : "How to GraphQL", body : "Loved it", published : false, author : "103"},
]
const typeDefs = `
    type Query {
        hello : String!
        fruits : [String!]!
        me : User!
        users : [User!]!
        user(query : String!) : [User!]!
        posts : [Post!]!
    }
    type Post { 
        id : ID!
        title : String!
        body : String!
        published : Boolean!
        author : User!
    }
    type User {
        id : ID!
        name : String!
        age : Int!
        email : String!
        posts : [Post!]!
    }
`
const resolvers = {
    Query : {
        hello : () => {
            return "Hello World!"
        },
        fruits(){ return ["Apple", "Orange", "Pear"] },
        me(){
            return { id : "1", name : "Sumit", email : "sumit@test.com", age : 32}
        },
        users(){
            return users;
        },
        user(parent, args, context, info){
            return users.filter(user =>{
                return user.name.includes(args.query) || user.email.includes(args.query)
                })
        },
        posts() {
            return posts;
        }
    },
    Post : {
        author(parent, args, ctx, info){
           return users.find(user => user.id === parent.author )
        }
    },
    User : {
        posts(parent, args, ctx, info){
            return posts.filter(post => post.author === parent.id)
        }
    }
}

const server = new GraphQLServer({
    typeDefs,           // Schema
    resolvers           // Functions to run for mentioned type in Schema
})

server.start({port : 9099}, () => {console.log("GraphQL Server started at PORT : 9099")})

// Scalar Types - ID, Int, String, Boolean, Date



// Three Operations - 
// Query - To fetch data, (READ)
// Mutation - to update data, (CREATE, UPDATE, DELETE)
// Subscription - for subscribing the data


// Template String - " " || ' ' || ` ` Back Tick