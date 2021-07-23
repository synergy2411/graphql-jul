const server = require("./server")

const options = {port : process.env.PORT || 9090}
server.start(options, () => console.log("Server is started at PORT : ", options.port))