// Common Module Syntax
const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
    type Query {
        hello : String!
    }
`
const resolvers = {
    Query : {
        hello : () => {
            return "Hello World!"
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