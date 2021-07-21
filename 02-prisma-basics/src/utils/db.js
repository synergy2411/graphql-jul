const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient()

const createUser = async(parent, args, ctx, info) => {
    const {name, email, password } = args.data;
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: { name, email, password : hashedPassword }
    })
    return {...user, password : null};
}

const createPost = async(parent, args, ctx, info) => {
    const { title, body, published, authorId } = args.data;
    const post = await prisma.post.create({
        data: {
            title, body, published, author : { connect : { id : Number(authorId)}}
        },
        include: {
            author : true
        }
    })
    return post
}

const fetchUsers = async (parent, args, ctx, info)=>{
    const users =  await prisma.user.findMany({include: { posts : true}})
    const allUsers = users.map(user => {
        user.password=null;
        return user
    })
    return allUsers;
}
const fetchPosts = async(parent, args, ctx, info) => {
    return await prisma.post.findMany({include: { author : true}})
}

const login = async(parent, args, ctx, info) => {
    const { email, password } = args.data;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(!user){
        throw new Error("User not found")
    }
    const valid = await bcrypt.compare(password, user.password)
    if(!valid){
        throw new Error("Not valid")
    }
    return {
        token: "this will get replaced by token",
        user
    }
}

module.exports = {
    createUser,
    fetchUsers,
    createPost,
    fetchPosts,
    login
 }