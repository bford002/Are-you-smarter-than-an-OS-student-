# smarterThanOSStudent
Trivia app to play with your friends!

# Description
smarterThanOSStudent is a trivia app that is designed to track your progress as you play through multiple rounds of trivia. The game is made in such a way that there are different game modes to select from and each player's stats are saved under their own account, created using their google credentials. There is a Daily game mode that allows all users to attempt the same trivia questions that are randomized every 24 hours. There is our classic game mode that allows users to attempt 5 general knowledge questions. Finally, there is a custom game mode that allows users to choose the contraints of their trivia game based on three dropdown fields.
On inital entry you're prompted to login using google OAuth, and if you're not a returning user a new account is created defaulting to your google display name as your username. Upon successful login authentication user is prompted to select a game mode.
Each player has a unique player profile that can be modified by clicking on their name in the navigation bar. They're able to upload a personal image and customize their username (as long as it does not match the username of any other active player in the database).

# Application 
Entertainment/Games

# Dependancies 
```
"dependencies": {
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@material-table/core": "^5.0.0-experimental.0",
    "@material-ui/core": "^4.12.4",
    "@mui/icons-material": "^5.8.0",
    "@mui/lab": "^5.0.0-alpha.83",
    "@mui/material": "^5.8.1",
    "@mui/styles": "^5.8.0",
    "axios": "^0.27.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "dotenv-webpack": "^7.1.0",
    "express-session": "^1.17.3",
    "node-cron": "^3.0.0",
    "passport": "^0.6.0",
    "passport-google-oauth2": "^0.2.0",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-router-dom": "^6.3.0"
  },
  "devDependencies": {
    "@babel/core": "^7.18.0",
    "@babel/preset-env": "^7.18.0",
    "@babel/preset-react": "^7.17.12",
    "babel-loader": "^8.2.5",
    "css-loader": "^6.7.1",
    "eslint": "^8.15.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-jsx-a11y": "^6.5.1",
    "eslint-plugin-react": "^7.30.0",
    "eslint-plugin-react-hooks": "^4.5.0",
    "express": "^4.18.1",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "mongoose": "^6.3.4",
    "mongoose-findorcreate": "^3.0.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.72.1",
    "webpack-cli": "^4.9.2"
  }
```
# Installation and Startup
1. Fork TheYesMen/Are-you-smarter-than-an-OS-student- repo
2. Clone your forced repo to your local system
3. Run npm install to install dependancies
```
npm i
```
4. Create a .env file in your main directory. You can run the following command to create your .env file using .env.example as a base model.
```
cp .env.example .env
```
5. Compile your files to create bundle.
```
npm run build:client
```
6. Start the server
```
npm start
```

# Google OAuth
Google Oauth requires a google cloud account. First create your account and then navigate to the developer console. Go to credentials and press "create credentials" and then click "OAuth Client ID". Follow the on-screen promps until you've recieved a CLIENT_ID and CLIENT_SECRET. These values go inside the .env file. Also ensure you add all authorized redirect URI's to your google API credentials.

# Deployment
AWS EC2 was used to deploy the application. Some tips for deployment can be found in the deploy.md file included in this repo.

# Schema 
The schema's for your DB are declared in the following path:
```
~/server/db/models
```

# Mongo Atlas
We deployed using Mongo Atlas to manage our database. Navigate to Mongo Atlas' webpage and signup for their service. Create a cluster. From Mongo Atlas' Home screen you can select "Database" under the "Deployment" title in the left hand side of the navigation menu. On your cluster, click the "connect" button, then choose the "Connect your application" option on the following window. Here, you should see your DB's URI. Ensure that your .env ATLAS_URI points you to the appropriate database for your project.