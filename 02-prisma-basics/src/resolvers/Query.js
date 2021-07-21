const { fetchUsers } = require("../utils/db")
const Query = {
    users : fetchUsers
}

module.exports = Query
