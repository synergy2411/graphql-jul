const { createUser, createPost, login, updateUser, deleteAll } = require("../utils/db")

const Mutation = {
    createUser,
    createPost,
    updateUser,
    deleteAll,
    login
}

module.exports = Mutation
