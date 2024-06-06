import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, browserSessionPersistence, inMemoryPersistence } from 'firebase/auth';
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
// Inicializar a autenticação com persistência condicional
let auth;
if (typeof window !== 'undefined' && window.localStorage) {
  // Ambiente web: usar sessionStorage para persistir entre abas
  auth = initializeAuth(app, {
    persistence: browserSessionPersistence
  });
} else if (AsyncStorage) {
  // Ambiente React Native: usar AsyncStorage
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  // Outros ambientes: usar persistência em memória (não persiste entre sessões)
  auth = initializeAuth(app, {
    persistence: inMemoryPersistence
  });
}
const db = getFirestore(app);

export { auth, db };
