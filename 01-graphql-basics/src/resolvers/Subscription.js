const Subscription = {
    count: {
     subscribe(parent, args, {db, pubsub}, info ){
         let counter = 0;
         setInterval(() => {
             counter++;
             pubsub.publish("ChannelName", {
                 count : counter
             })
         }, 500)
         return pubsub.asyncIterator("ChannelName")
     }   
    },
    comment: {
        subscribe(parent, args, {db, pubsub}, info){
            const {postId } = args
            const match = db.posts.some(post => post.id === postId)
            if(!match){
                throw new Error("Unable to find post")
            }
            return pubsub.asyncIterator(`comment ${postId}`)        // comment 201
        }
    }
}

export default Subscription