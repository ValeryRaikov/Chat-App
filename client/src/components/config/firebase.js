import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFireStore, setDoc } from 'firebase/firestore';
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyByCy3ts651djwh9yjeOknulwxee8lwS2o",
  authDomain: "chat-app-364dc.firebaseapp.com",
  projectId: "chat-app-364dc",
  storageBucket: "chat-app-364dc.appspot.com",
  messagingSenderId: "851787983563",
  appId: "1:851787983563:web:4a3962ee673915de0d494e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFireStore(app);

const signup = async (username, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);

        const user = response.user;

        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: '',
            avatar: '',
            bio: 'Hey there, I am using Chat App',
            lastSeen: Date.now(),
        });

        await setDoc(doc(db, 'chats', user.uid), {
            chatData: [],
        });
    } catch (err) {
        console.error(err);
        toast.error(err.code);
    }
}

export {
    signup,
};