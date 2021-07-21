const { createUser, createPost, login } = require("../utils/db")

const Mutation = {
    createUser,
    createPost,
    login
}

module.exports = Mutation
