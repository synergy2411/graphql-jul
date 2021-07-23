const { GraphQLServer } = require("graphql-yoga")
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const { getToken } = require("./utils/auth");

const server = new GraphQLServer({
    typeDefs : "./src/schema.graphql",
    resolvers : {
        Query,
        Mutation,
    },
    context : ({request}) => {
        return {
            token : request && request.headers.authorization  ? 
                        getToken(request.headers.authorization) :
                        null
        }
    }
})

module.exports = server