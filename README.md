# runoff
A photostream apart from the social media flood  
![runoff](https://media2.giphy.com/media/GgVR3S0nuVyTHnmWZw/giphy.gif?cid=790b761186e6a39c6c8d59afadac501ded083eca94129d64&rid=giphy.gif&ct=g)
## what
runoff is a basic template for generating personal photostream sites. Kind of like instagram, without all the stuff.  
You can view a live demo (and my own personal photostream) [here](http://photostream.matthewlawrencekle.in/). The passcode is _runoff_  

runoff is built with [Svelte](https://github.com/sveltejs/svelte), [chotaCSS](https://github.com/jenil/chota), and Google [cloud firestore](https://firebase.google.com/docs/firestore) + [storage](https://firebase.google.com/docs/storage). runoff is:
- unobtrusive (runoff stores zero cookies, registers zero users, and tracks zero usage)
- private by default
- unopinioned (ok, maybe just a little)
- mobile friendly

At present, runoff requires a google developer account. See the development roadmap below for proposed changes to the requirement.

## getting started
Getting started with runoff should take ~ 15 minutes, and consists of three steps:
- configuring your firebase backend
- configuring your svelte frontend
- deploying your site

### configuring your firebase backend
- from the __project overview__ landing, select __web__ under 'get started by adding Firebase to your app'.
    - give your app a nickname. take note of your `firebaseConfig` object, to be used later.
- navigate to your [firebase console](https://console.firebase.google.com/) and select __add project__. Name your project and proceed.
- from the project dashboard, navigate to __firestore database__ and select __create database__
    - set your security rules and server location
    - once provisioned, you will start three `collections`
        - a `photos` collection
        - a `bio` collection with two documents that must _initially_ be set from the firebase developer console:
            - a `byline` kvp with string value
            - a `details` kvp with string value
            - a `link` object with:
                - a `linkURL` kvp with string value
                - a `linkTitle` kvp with string value   
        - a `secrets` collection with two documents that must _always_ be set from the firebase developer console:
            - an `admin` kvp with the value set to whatever passcode you'd like to use for __admin__ access
        - a `standard` kvp with the value set to whatever passcode you'd like to share for __standard__ access
- from the project dashboard, navigate to __storage__ and select __rules__
    - from the __edit rules__ tab, change ln 5 of the rules object to be `allow read, write`. your storage is now configured.

### configuring your svelte frontend
- fork/clone this repository to your local machine.
- open the cloned directory in the IDE/text editor of your choice
- once in the directory, run `npm i` to install dependencies
- in the `src` folder, open `main.js` and add your `firebaseConfig` data where specified
    - note: firebase credentials are not secret and [do not need to be obsfucated](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public#:~:text=It%20is%20not%20a%20security,interact%20with%20your%20Firebase%20project.)
- you can additionally alter the site title from the `index.html` file in the `public` folder.
- see development roadmap below for proposed changes to styling
- you can test the functionality of your site by running `npm run dev` from the project directory and navigating to `http://localhost:5000/` in any browser.

### deploying your site
- for users looking to host static files
    - run `npm run build` from the project directory.
    - the contents of your `public` folder are now ready to be deployed.
- for users looking to host using [firebase hosting](https://firebase.google.com/docs/hosting)
    - in your project directory, open the `.firebaserc` file and change the `default project` value to match your project
    - navigate to your firebase project dashboard and select __hosting__
    - select __get started__
    - follow the prompts to use firebase's CLI tool to configure your hosting settings.
        - confirm the default build folder as `public`
        - choose __No__ when asked to overwrite the existing `index.html`
    - follow the additional steps to optionally configure [github actions](https://github.com/features/actions)
    - run `firebase deploy` to deploy your hosted photostream

## development roadmap
current future plans, in tentative order of priority, include:
- migrating the backend to [supabase](https://supabase.io/), the open-source firebase alternative
- creating a global styling object to easily set style elements like font or color-theme
- more in-depth documentation of github actions configuration
- refactor codebase with the aim of reducing bundle size.

## contributing (yes plz)
- please see contributing guidelines [here](https://github.com/matthewlawrenceklein/runoff/blob/main/CONTRIBUTING.md)

## license
code released under the [GNU general public license v3](https://github.com/matthewlawrenceklein/runoff/blob/main/LICENSE)
