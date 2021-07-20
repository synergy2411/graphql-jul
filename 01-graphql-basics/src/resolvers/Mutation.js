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
    updateUser(parent, args, {db}, info){
        const {name, email, age} = args.data;
        const user = db.users.find(user => user.id === args.id)
        if(!user){
            throw new Error("User does not exist")
        }
        if(typeof name === 'string'){
            user.name = name;
        }
        if(typeof email === 'string'){
            user.email = email;
        }
        if(typeof age !== 'undefined'){
            user.age = age;
        }
        return user;
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
    updatePost(parent, args, {db}, info){
        const {title, body, published } = args.data;
        const post = db.posts.find(post => post.id === args.id)
        if(!post){
            throw new Error("Uanble to find post")
        }
        if(typeof title === 'string'){
            post.title = title
        }
        if(typeof body === 'string'){
            post.body = body
        }
        if(typeof published === 'boolean'){
            post.published = published
        }
        return post;
    },
    createComment(parent, args, {db, pubsub}, info){
        const {text, postId, authorId} = args.data;
        const userExists = db.users.some(user => user.id === authorId)
        const postExists = db.posts.some(post => post.id === postId)
        if(!userExists || !postExists){
            throw new Error("Unable to create comment")
        }
        const newComment = { id : v4(), text, post : postId, author : authorId}
        db.comments.push(newComment)
        pubsub.publish(`comment ${postId}`, {comment : {
            comment : newComment,
            mutate : "CREATED"
        }})
        return newComment
    },
    deleteComment(parent, args, {db, pubsub}, info){
        const position = db.comments.findIndex(comment => comment.id === args.id)
        if(position === -1)
        {
            throw new Error("Unable to delete commen")
        }
        const [deletedComment]= db.comments.splice(position, 1)
        pubsub.publish(`comment ${deletedComment.post}`, {
            comment : {
                comment : deletedComment,
                mutate : "DELETED"
            }
        })
        return deletedComment;
    },
    updateComment(parent, args, {db}, info){
        const {text} = args.data;
        const comment = db.comments.find(comment => comment.id == args.id)
        if(!comment){
            throw new Error("Comment does not exist")
        }
        if(typeof text === 'string'){
            comment.text = text
        }
        return comment;
    }
    
}

export default Mutation