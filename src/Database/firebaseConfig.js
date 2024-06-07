import { initializeApp } from 'firebase/app';
import { getFirestore, GeoPoint } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Import initializeAuth
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAA1pMaTwdPCywryeddMbuhX2ABu42wXGI",
  authDomain: "van-data-63089.firebaseapp.com",
  projectId: "van-data-63089",
  storageBucket: "van-data-63089.appspot.com",
  messagingSenderId: "901692074729",
  appId: "1:901692074729:web:e33fa82a0a50866d54de78",
  measurementId: "G-NX0LDXFMDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { db, auth, GeoPoint };
