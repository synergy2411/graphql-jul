const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()


async function main(){
    const post = await prisma.post.create({data : {
        body : "the body",
        title : "the title",
        published : false,
        author : { connect : { id : 101}}
    }})

    console.log("POST - ", post);
    
    // await prisma.user.deleteMany()
    // const user = await prisma.user.create({
    //     data : {
    //         name : "john doe",
    //         email : "john@test.com",
    //         password : 'john123'
    //     }
    // })
    // console.log("CREATED USER : ", user)
    // const allUsers = await prisma.user.findMany()
    // console.log("ALL USERS - ", allUsers)
}

main().catch(err => {console.log(err)})