import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDF2OupJKX5HgM58kfJ5UBHRrQi2yRjMhU",
  authDomain: "lifehack22-daf98.firebaseapp.com",
  projectId: "lifehack22-daf98",
  storageBucket: "lifehack22-daf98.appspot.com",
  messagingSenderId: "967080109736",
  appId: "1:967080109736:web:458b6c179c4d8b6e92c49d"
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
