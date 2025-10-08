import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDsA5mpxHX5EQEohUmgqH0uloGi9njj4x0",
  authDomain: "shopez-ef0e9.firebaseapp.com",
  databaseURL: "https://shopez-ef0e9-default-rtdb.firebaseio.com",
  projectId: "shopez-ef0e9",
  storageBucket: "shopez-ef0e9.firebasestorage.app",
  messagingSenderId: "687261471989",
  appId: "1:687261471989:web:38e3ac3bbba3190774a1bc"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getDatabase(app);