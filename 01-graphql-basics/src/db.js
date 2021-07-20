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
    { id : "301", text : "Good course", post : "201", author : "104"},
    { id : "302", text : "Liked it", post : "201", author : "104"},
    { id : "303", text : "....", post : "202", author : "103"},
    { id : "304", text : "This is my comment", post : "203", author : "102"},
]

const db = { users, posts, comments}

export default db;