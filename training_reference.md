# Generate package.json file
    - npm init

# Install GraphQL Yoga
    - npm install graphql-yoga@latest --save

# Nodemon to restart the server on changes
    - npm install nodemon -g
    - nodemon index.js
    - node index.js

# To load ES6 Modules
    - @babel/core
    - @babel/cli
    - @babel/preset-env
    - @babel/node

# To connect database
    - npm install prisma -save-dev
    - npx prisma
    - npx prisma init                       (Create a new Prisma Project)
    - npx prisma migrate dev                (Migrate PSL with database)
    - npm install @prisma/client --save     (Generate Prisma Client)
    - npx prisma studio                     (kick-start the GUI Tool - view / edit the data - http://localhost:5555)

    - npm install bcryptjs --save           (For hashify the password field)
    - npm install jsonwebtoken --save       (Generate / Verify JWT Token)

    
- nodemon src/utils/prisma-basics.js