const { add } = require("../utils/math") ;
const server = require("../server");
const { ApolloClient, InMemoryCache, gql, HttpLink } = require("@apollo/client")
const fetch = require("cross-fetch")
const { PrismaClient } = require("@prisma/client")

let serverInstance = null;
let client = null;
let prisma = null;

beforeAll(async() => {
    const options = {port : 9011}
    serverInstance = await server.start(options, () => {console.log("Server started at PORT : ", options.port)})
    client = new ApolloClient({
        cache : new InMemoryCache(),
        link : new HttpLink({
            uri : "http://localhost:9011",
            fetch
        })
    })
    prisma = new PrismaClient()
})

afterAll(async () => {
    await serverInstance.close()
})

beforeEach(async () => {
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()
})

test("Should create the User", async () => {

    const createUser = gql`
    mutation {
        createUser(data : {
            name : "john doe",
            email : "john@test.com",
            password : "red123"
         }) { id name email}
    }
    `

    const result = await client.mutate({
        mutation :  createUser
    })

    expect(result.data.createUser.name).toBe("john doe")

})


test("Should pass the test", () => {
    expect(add(3,4)).toEqual(7)    
})