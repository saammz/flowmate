import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (email, password) => {
  try {
    // Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    console.log('Firebase User:', firebaseUser);

    // Get Firebase ID token
    const idToken = await firebaseUser.getIdToken();
    console.log('Firebase ID Token:', idToken);

    // Send user data to MongoDB via your backend
    const response = await axios.post(`${API_BASE_URL}/users/register`, {}, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    return {
      firebaseUser,
      userData: response.data
    };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Get user data from MongoDB
    const idToken = await firebaseUser.getIdToken();
    const response = await axios.get(`${API_BASE_URL}/users/getUser`, {
      headers: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    return {
      firebaseUser,
      userData: response.data
    };
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};