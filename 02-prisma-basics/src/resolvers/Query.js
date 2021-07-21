const { fetchUsers, fetchPosts } = require("../utils/db")
const Query = {
    users : fetchUsers,
    posts : fetchPosts
}

module.exports = Query
