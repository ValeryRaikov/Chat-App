import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

import './LeftSidebar.css';
import assets from '../../assets/assets';

import { AppContext } from '../../context/AppContext';

export default function LeftSidebar() {
    const navigate = useNavigate();
    const { 
        userData, 
        chatData,
        chatUser,
        setChatUser,
        messagesId,
        setMessagesId,
        chatVisible,
        setChatVisible,
    } = useContext(AppContext);
    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(false);

    const inputHandler = async (e) => {
        try {
            const input = e.target.value.trim();

            if (input) {
                setShowSearch(true);
                const userRef = collection(db, 'users');
                const q = query(userRef, where('username', '==', input.toLowerCase()));
                const querySnap = await getDocs(q);

                if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
                    let userExists = false;
                    chatData.map((user) => {
                        if (user.rId === querySnap.docs[0].data().id) {
                            userExists = true;
                        }
                    });

                    if (!userExists) {
                        setUser(querySnap.docs[0].data());
                    } else {
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            } else {
                setShowSearch(false);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    }

    const addChat = async () => {
        const messagesRef = collection(db, 'messages');
        const chatsRef = collection(db, 'chats');

        try {
            const userMsgRef = doc(messagesRef);
            await setDoc(userMsgRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            await updateDoc(doc(chatsRef, user.id), {
                chatsData: arrayUnion({
                    messageId: userMsgRef.id,
                    lastMessage: '',
                    rId: userData.id,
                    updatedAt: Date.now(),
                    messageSeen: true,
                }),
            });

            await updateDoc(doc(chatsRef, userData.id), {
                chatsData: arrayUnion({
                    messageId: userMsgRef.id,
                    lastMessage: '',
                    rId: user.id,
                    updatedAt: Date.now(),
                    messageSeen: true,
                }),
            });

            const userSnap = await getDoc(doc(db, 'users', user.id));
            const userData = userSnap.data();

            setChat({
                messageId: messagesRef.id,
                lastMessage: '',
                rId: user.id,
                updatedAt: Date.now(),
                messageSeen: true,
                userData,
            });

            setShowSearch(false);
            setChatVisible(true);
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    }

    const setChat = async (item) => {
        try {
            setMessagesId(item.messageId);
            setChatUser(item);

            const userChatsRef = doc(db, 'chats', userData.id);
            const userChatsSnapshot = await getDoc(userChatsRef);
            const userChatsData = userChatsSnapshot.data();
            const chatIdx = userChatsData.chatsData.findIndex((c) => c.messageId === item.messageId);

            userChatsData.chatsData[chatIdx].messageSeen = true;
            await updateDoc(userChatsRef, {
                chatsData: userChatsData.chatsData,
            });
            setChatVisible(true);
        } catch (err) {
            console.error(err);
            toast.error(err.message);
        }
    }

    useEffect(() => {
        const updateChatUserData = async () => {
            if (chatUser) {
                const userRef = doc(db, 'users', chatUser.userData.id);
                const userSnap = await getDoc(userRef);
                const userData = userSnap.data();

                setChatUser(prev => ({...prev, userData}));
            }
        }

        updateChatUserData();
    }, [chatData]);

    return (
        <div className={`ls ${chatVisible ? 'hidden' : ''}`}>
            <div className="ls-top">
                <div className="ls-nav">
                    <img src={assets.logo} alt={assets.logo.toString()} className="logo" />
                    <div className="menu">
                        <img src={assets.menu_icon} alt={assets.menu_icon.toString()} />
                        <div className="submenu">
                            <p onClick={() => navigate('/profile')}>Edit Profile</p>
                            <hr />
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
                <div className="ls-search">
                    <img src={assets.search_icon} alt={assets.search_icon.toString()} />
                    <input 
                        onChange={inputHandler}
                        type="text" 
                        placeholder="Search here..." 
                    />
                </div>
            </div>
            <div className="ls-list">
                {showSearch && user 
                    ? <div onClick={addChat} className="friends add-user">
                        <img src={user.avatar} alt="" />
                        <p>{user.name}</p>
                    </div>
                    : chatData?.map((item, idx) => (
                        <div   
                            onClick={() => setChat(item)} 
                            key={idx} 
                            className={`friends ${item.messageSeen || item.messageId === messagesId ? '' : 'border'}`}
                        >
                            <img src={item.userData.avatar} alt="" />
                            <div>
                                <p>{item.userData.name}</p>
                                <span>{item.lastMessage}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}