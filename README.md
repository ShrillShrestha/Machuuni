## Machuuni
<p>A lot of time people suffer from mental health issues for a long time mostly because they don’t have anyone to share it with or they don’t feel anyone will understand. Basically, the idea of this app is to provide a space to let them know that they are not alone. So, Machhuni is a safe space to share personal experiences, advice, and tips relating to mental health. </p>

### Firebase integration:
 <p>The project uses firebase feature like cloud functions, hosting, etc. The hosting host the index.html file created using react (npm run build). The cloud functions basically runs a node app in it. </p>
  
#### Things to remember:
 - You need to have an google maps api key and set it under the environment variable map.api_key using the command <code> firebase functions:config:set map.api_key="YOUR_API_KEY" </code>.
 - You also need the api to rebuild the react project. You can add the api key in a .env file under the name REACT_APP_API_KEY .i.e <code> REACT_APP_API_KEY=YOUR_API_KEY </code>
 - Before initializing firebase hosting make sure to build the react project. Then link the <code> index.html </code> file in the <code> build </code> folder when you are asked to genrate a public directory for hosting. Just give the path to the index.html file. It should work.
 - Also, you need to use the right plan for the firebase project and enable payment for the api. For a demo it won't be much also sometime you might have free credits 
 
 P.S. Docs are present in <code> docs </code> folder. Just run the <code> index.html </code>.

 ### To run locally:
 <p> Node server is used to run the backend to test locally. The setting for the app to run locally is in the branch `local-test`. </p>
 
 #### Steps:
 - Create a google API key and enable map feature for the API. If you want, you can add resctrictions to enable API security.
 - Create a `.env` file inside `client` and add `REACT_APP_API_KEY=YOUR_API_KEY` 
 - Also create another `.env` file inside `functions` folder and add `MAP_API_KEY=YOUR_API_KEY`.
 - Checkout to the `local-test` branch
 - Run `npm install`
 - Run `cd functions`
 - Run `npm run local`, or `npm run local-dev` to enable watch
 - On a seperate terminal window: run `cd client` from project root
 - Run `npm start`

 <p> The app runs in `https://localhost:3000` by default. For map feature go to: `https://localhost:3000/map`. </p>
