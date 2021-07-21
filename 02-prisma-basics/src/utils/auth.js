const getToken = authHeaders => {
    if(!authHeaders){
        throw new Error("Auth header not present")
    }
    const token = authHeaders.split(" ")[1]           // "Bearer token....."
    if(!token){
        throw new Error("Token not found")
    }
    return token
}

module.exports = { getToken }