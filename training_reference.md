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


# GraphQL - App Deplyment
1. Sign up on Heroku
2. Download and install Heroku CLI
3. Check heroku version > heroku --version
4. Github Account
5. Login to Github and create repo
6. Uploaded all project content to repo
7. Make adjustments to code for deploy
    - "start" : "node src/index.js"     (triggered by Heroku)
    - Adjust the port - process.env.PORT
8. Login to Heroku
    - heroku login
9. Add ssh key to heroku
    - heroku keys:add
    - Create SSH Key (ssh-keygen from Powershell) - optional step, if ssh key is not available
10. Create the project on Heroku
    - heroku create <unique_project_name>
11. Push code to heroku
    - git remote
    - git push heroku main


# Created React Project
    - npx create-react-app <app_name>
    - cd <app_name>
    - npm start
    - npm install @apollo/client graphql --save