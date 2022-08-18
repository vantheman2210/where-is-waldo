import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'; 
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCxWd8juDCrf7kv7hzfd4Cv_3f6v2txElQ',
	authDomain: 'waldo-app-34031.firebaseapp.com',
	projectId: 'waldo-app-34031',
	storageBucket: 'waldo-app-34031.appspot.com',
	messagingSenderId: '287421846194',
	appId: '1:287421846194:web:8472d8a06b2a2899552fab'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const user = auth.currentUser;
