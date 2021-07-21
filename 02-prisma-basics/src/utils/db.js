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

const fetchUsers = async (parent, args, ctx, info)=>{
    return await prisma.user.findMany()
}

module.exports = {
    createUser,
    fetchUsers
 }