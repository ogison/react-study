import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore, GoogleAuthProvider} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlF2KYynQS2y6UQCss2S6UZSjuv8rT_3I",
  authDomain: "blog-5933f.firebaseapp.com",
  projectId: "blog-5933f",
  storageBucket: "blog-5933f.appspot.com",
  messagingSenderId: "152124487867",
  appId: "1:152124487867:web:196ccd83c4ff945167119e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };