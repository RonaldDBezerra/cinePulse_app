import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";
import { auth } from "./firebase";

export const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const logout = () => {
  return signOut(auth);
};

export const getCurrentUser = () => {
  return auth.currentUser;
}

export const deleteAccount = (user: User) => {
  return deleteUser(user);
}