const { GraphQLServer } = require("graphql-yoga")
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");

const server = new GraphQLServer({
    typeDefs : "./src/schema.graphql",
    resolvers : {
        Query,
        Mutation
    }
})

const options = {port : process.env.PORT || 9090}
server.start(options, () => console.log("Server is started...."))