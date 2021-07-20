import { GraphQLServer } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'

const server = new GraphQLServer({
    typeDefs : './src/schema.graphql',
    resolvers : {
        Query,
        User,
        Post,
        Comment
    },           
    context : {
        db
    }
})

server.start({port : 9099}, () => {console.log("GraphQL Server started at PORT : 9099")})
