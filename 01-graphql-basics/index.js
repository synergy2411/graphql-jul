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

const comments = [
    { id : "301", text : "Good course", post : "201"},
    { id : "302", text : "Liked it", post : "201"},
    { id : "303", text : "....", post : "202"},
    { id : "304", text : "This is my comment", post : "203"},
]
const typeDefs = `
    type Query {
        users : [User!]!
        posts : [Post!]!
        comments : [Comment!]!
    }
    type Comment {
        id : ID!
        text : String!
        post : Post!
    }
    type Post { 
        id : ID!
        title : String!
        body : String!
        published : Boolean!
        author : User!
        comments : [Comment!]!
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
        users(){
            return users;
        },
        posts() {
            return posts;
        },
        comments(){
            return comments;
        }
    },
    Post : {
        author(parent, args, ctx, info){
           return users.find(user => user.id === parent.author )
        },
        comments(parent, args, ctx, ingo){
            return comments.filter(comment => comment.post === parent.id)
        }
    },
    User : {
        posts(parent, args, ctx, info){
            return posts.filter(post => post.author === parent.id)
        }
    },
    Comment : {
        post(parent, args, ctx, info){
            return posts.find( (post) => post.id === parent.post)
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