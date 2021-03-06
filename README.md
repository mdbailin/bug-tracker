# BugTracker 

BugTracker is a fullstack, lightweight application that helps organizations describe, assign, and manage bugs in their software development lifecycle. Version 1.1 of the software contains all of the following features:

1.  :closed_lock_with_key: User authentication, so that a user can only modify tickets that belong to them
2. :office: Projects, where multiple members of the team can be assigned and solve various tickets underneath that project
3. :raising_hand: User profiles, each of which provide individual member statistics on the number of tickets completed per month among other information
4. :chart_with_upwards_trend:A professional dashboard, complete with organization statistics, a "latest tickets" feed, and the option to set the application to fullscreen
5. :new_moon: A dark mode!

Current features planned for the software include a search bar to search through tickets, a messaging system, and a comment log added to tickets in order to track their progression.

## Getting Started

Begin starting by installing the following dependencies in the project's root folder, using ```npm install``` while running the commmand on the same folder of package.json. Here are some of the major dependencies you'll be working with:

- [React](https://reactjs.org/) is a declarative, components-based frontend framework.

- [Firebase](https://firebase.google.com/) is an app development platform that current handles the app's database and deployment. If you'd like to host your own build of the app, you'll need to create a firebase account [here](https://console.firebase.google.com/u/0/?pli=1).

- [MUI](https://mui.com/), or Material UI, is a comprehensive collection of UI tools ready to be integrated with your React components.

## Setting up Firebase

You can [set up Firebase](https://firebase.google.com/docs/web/setup) with your project easily using the following steps:

1. Create a Firebase Project and register your app
2. Install the SDK and initialize Firebase

Install Firebase using npm:

```bash
npm install firebase
```

Initialize Firebase in your app and create a Firebase App Object:

```bash
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
```

3. Access Firebase in your app

You should have a separate ```firebase.js``` in the root directory of your project, which should look something like this:

```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, setLogLevel } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  databaseURL: XXXXXXXXXX,
  apiKey: XXXXXXXXXX, //use an environmental variable for your apiKey
  authDomain: XXXXXXXXXX.firebaseapp.com,
  projectId: XXXXXXXXXX,
  storageBucket: XXXXXXXXXX.appspot.com,
  messagingSenderId: XXXXXXXXXX,
  appId: XXXXXXXXXX
}

setLogLevel('silent');
const app = initializeApp(firebaseConfig, setLogLevel("silent"));
export const db = getFirestore(app, setLogLevel("silent"))
export const auth = getAuth()
export const storage = getStorage(app);
```

Note that ```setLogLevel('silent')``` was configured in order to prevent excessive logging, which is charged as per Google Firestore's policies.


#### Running Tests
To run the tests, run
```bash
npm run test
```
and select 'a' to run the entire suite of tests.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
