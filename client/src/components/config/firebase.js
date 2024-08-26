import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
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
const db = getFirestore(app);

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
            chatsData: [],
        });
    } catch (err) {
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(' ')); 
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(' ')); 
    }
}

const resetPassword = async (email) => {
    if (!email) {
        toast.error('Enter your email.');
        return null;
    }

    try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('email', '==', email));
        const querySnap = await getDocs(q);

        if (!querySnap.empty) {
            await sendPasswordResetEmail(auth, email);
            toast.success('Reset email sent successfully.')
        } else {
            toast.error('Email does not exist!')
        }
    } catch (err) {
        console.error(err);
        toast.error(err.message);
    }
}

export {
    signup,
    login,
    logout,
    auth,
    db,
    resetPassword,
};