import { initializeApp } from 'firebase/app';
import { getFirestore, setLogLevel } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyD8YMntws5dvJN24_M-Jn-pyhhxBsfM9ag",
  authDomain: "hexa-ai-a9bcd.firebaseapp.com",
  projectId: "hexa-ai-a9bcd",
  storageBucket: "hexa-ai-a9bcd.firebasestorage.app",
  messagingSenderId: "1001623190526",
  appId: "1:1001623190526:web:0ea47edb76056809f49eaf"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
setLogLevel('debug');
const functions = getFunctions(app);

export { app, db, functions };