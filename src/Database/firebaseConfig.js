import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

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

// Inicialize o Firebase Auth com persistência
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);
const analytics = getAnalytics(app);
