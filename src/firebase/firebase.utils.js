import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCqNfwN6preY6JoUo_U2txgahmaky5xQ6w",
  authDomain: "crwn-db-1e3aa.firebaseapp.com",
  databaseURL: "https://crwn-db-1e3aa.firebaseio.com",
  projectId: "crwn-db-1e3aa",
  storageBucket: "crwn-db-1e3aa.appspot.com",
  messagingSenderId: "94354142601",
  appId: "1:94354142601:web:bb24457182ceded1109d58",
  measurementId: "G-4ZEP214RK8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
