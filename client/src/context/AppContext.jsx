import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { auth, db } from "../components/config/firebase";

export const AppContext = createContext(null);

const AppContextProvider = ({children}) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);

    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();

            setUserData(userData);

            if (userData.avatar && userData.name) {
                navigate('/chat');
            } else {
                navigate('/profile');
            }

            await updateDoc(userRef, {
                lastSeen: Date.now(),
            });

            setInterval(async () => {
                if (auth.chatUser) {
                    await updateDoc(userRef, {
                        lastSeen: Date.now(),
                    });
                }
            }, 60000);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if (userData) {
            const chatRef = doc(db, 'chats', userData.id);
            const unsubscribe = onSnapshot(chatRef, async (response) => {
                const chatItems = response.data().chatData();
                const tempData = [];
                for (const item of chatItems) {
                    const userRef = doc(db, 'users', item.rId);
                    const userSnap = await getDoc(userRef);
                    const userData = userSnap.data();
                    tempData.push({...item. userData});
                }

                setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
            });

            return (() => unsubscribe());
        }
    }, [userData]);

    const contextValue = {
        userData,
        setUserData, 
        chatData,
        setChatData,
        loadUserData,
    };

    return (
        <AppContext.Provider value={contextValue} >
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;