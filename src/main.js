import App from './App.svelte';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	// TODO: add your config data
  };

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const app = new App({
	target: document.body,
});

export default app;