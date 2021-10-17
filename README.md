# runoff
A photostream apart from the social media flood

## what
runoff is a basic template for generating personal photostream sites. Kind of like instagram, without all the stuff.
runoff is built with [Svelte](https://github.com/sveltejs/svelte), [chotaCSS](https://github.com/jenil/chota), and Google [cloud firestore](https://firebase.google.com/docs/firestore) + [storage](https://firebase.google.com/docs/storage). runoff is
- lightweight
- private by default
- unopinioned (ok, maybe just a little)
- mobile friendly

At present, runoff requires a google developer account. See the development roadmap below for planned changes to the requirement.

## get started
Getting started with runoff consists of three steps
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
        - a `bio` collection
        - a `photos` collection
        - a `secrets` collection with two documents that must be set from the firebase developer console:
            - an `admin` kvp with the value set to whatever passcode you'd like to use for __admin__ access
        - a `standard` kvp with the value set to whatever passcode you'd like to share for __standard__ access
- you do not need to configure any __storage__ settings

### configuring your svelte frontend
- fork/clone this repository to your local machine.

