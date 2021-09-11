import App from './App.svelte';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: "AIzaSyAsU2T8m0hK-ngmvpcJ2nQ-Z-fskjRcD0w",
	authDomain: "rachel-photostream.firebaseapp.com",
	projectId: "rachel-photostream",
	storageBucket: "rachel-photostream.appspot.com",
	messagingSenderId: "735584074089",
	appId: "1:735584074089:web:55cf43347608eb7ef6e5f8",
	measurementId: "G-D6DLNHHXV4"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const app = new App({
	target: document.body,
});

export default app;