import { initializeApp } from 'firebase/app';
import { getFirestore, GeoPoint } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAA1pMaTwdPCywryeddMbuhX2ABu42wXGI",
  authDomain: "van-data-63089.firebaseapp.com",
  projectId: "van-data-63089",
  storageBucket: "van-data-63089.appspot.com",
  messagingSenderId: "901692074729",
  appId: "1:901692074729:web:e33fa82a0a50866d54de78",
  measurementId: "G-NX0LDXFMDP"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, GeoPoint };
