import { v4 } from 'uuid';

const Mutation = {
    createUser(parent, args, {db}, info ){
        const { name, email, age} = args.data
        const isMatched = db.users.some(user => user.email === email)
        if(isMatched){
            throw new Error("Email already taken.")
        }
        const newUser = {
            id : v4(),
            name,
            email,
            age
        }
        db.users.push(newUser)
        return newUser;
    },
    createPost(parent, args, {db}, info){
        const {title, body, published, authorId} = args.data;
        const match = db.users.some(user => user.id === authorId)
        if(!match){
            throw new Error("Unable to create post")
        }
        let newPost = {
            id : v4(), title, body, published, author : authorId
        }
        db.posts.push(newPost)
        return newPost
    },
    createComment(parent, args, {db}, info){
        const {text, postId, authorId} = args.data;
        const userExists = db.users.some(user => user.id === authorId)
        const postExists = db.posts.some(post => post.id === postId)
        if(!userExists || !postExists){
            throw new Error("Unable to create comment")
        }
        const newComment = { id : v4(), text, post : postId, author : authorId}
        db.comments.push(newComment)
        return newComment
    }
}

export default Mutation