const { createUser, createPost } = require("../utils/db")

const Mutation = {
    createUser,
    createPost
}

module.exports = Mutation
