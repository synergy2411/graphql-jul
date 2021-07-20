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
    deleteUser(parent, args , {db}, ctx){
        const position = db.users.findIndex(user => user.id === args.id)
        if(position === -1){
            throw new Error("User does not exist")
        }
        const [deletedUser] = db.users.splice(position, 1)

        db.posts = db.posts.filter(post => {
            const matched = post.author === args.id
            if(matched){
                db.comments = db.comments.filter(comment => comment.post !== post.id)
            }
            return !matched;
        })
        db.comments = db.comments.filter(comment => comment.author !== args.id)
        return deletedUser;
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
    deletePost(parent, args, {db}, info){
        const position = db.posts.findIndex(post => post.id == args.id)
        if(position === -1){
            throw new Error("Unable to delete post")
        }
        const [deletedPost] = db.posts.splice(position, 1)

        db.comments = db.comments.filter(comment => comment.post !== args.id)

        return deletedPost;
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
    },
    deleteComment(parent, args, {db}, info){
        const position = db.comments.findIndex(comment => comment.id === args.id)
        if(position === -1)
        {
            throw new Error("Unable to delete commen")
        }
        const [deletedComment]= db.comments.splice(position, 1)
        return deletedComment;
    }
    
}

export default Mutation