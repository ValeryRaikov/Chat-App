import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { AppContext } from '../../context/AppContext';

import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

import './ChatBox.css';
import assets from '../../assets/assets';

import upload from '../../lib/upload';
import convertTimestamp from '../../utils/timeConverter';

export default function ChatBox() {
    const {
        userData,
        messagesId,
        chatUser,
        messages,
        setMessages,
    } = useContext(AppContext);

    const [input, setInput] = useState('');

    const sendMessage = async () => {
        try {
            if (input && messagesId) {
                await updateDoc(doc(db, 'messages', messagesId), {
                    messages: arrayUnion({
                        sId: userData.id,
                        text: input,
                        createdAt: new Date(),
                    })
                });

                const userIds = [chatUser.rId, userData.id]; 

                userIds.forEach(async (id) => {
                    const userChatsRef = doc(db, 'chats', id);
                    const userChatsSnapshot = await getDoc(userChatsRef);

                    if (userChatsSnapshot.exists()) {
                        const userChatData = userChatsSnapshot.data();
                        const chatIdx = userChatData.chatsData.findIndex(
                            (c) => c.messageId === messagesId
                        );
                        userChatData.chatsData[chatIdx].lastMessage = input.slice(0, 30);
                        userChatData.chatsData[chatIdx].updatedAt = Date.now();

                        if (userChatData.chatsData[chatIdx].rId === userData.id) {
                            userChatData.chatsData[chatIdx].messageSeen = false;
                        }

                        await updateDoc(userChatsRef, {
                            chatsData: userChatData.chatsData,
                        });
                    }
                });
            }
        } catch (err) {
            console.error(err.message);
            toast.error(err.message);
        }

        setInput('');
    }

    const sendImage = async (e) => {
        try {
            const fileUrl = await upload(e.target.files[0]);

            if (fileUrl && messagesId) {
                await updateDoc(doc(db, 'messages', messagesId), {
                    messages: arrayUnion({
                        sId: userData.id,
                        image: fileUrl,
                        createdAt: new Date(),
                    })
                });

                const userIds = [chatUser.rId, userData.id]; 

                userIds.forEach(async (id) => {
                    const userChatsRef = doc(db, 'chats', id);
                    const userChatsSnapshot = await getDoc(userChatsRef);

                    if (userChatsSnapshot.exists()) {
                        const userChatData = userChatsSnapshot.data();
                        const chatIdx = userChatData.chatsData.findIndex(
                            (c) => c.messageId === messagesId
                        );
                        userChatData.chatsData[chatIdx].lastMessage = 'Image';
                        userChatData.chatsData[chatIdx].updatedAt = Date.now();

                        if (userChatData.chatsData[chatIdx].rId === userData.id) {
                            userChatData.chatsData[chatIdx].messageSeen = false;
                        }

                        await updateDoc(userChatsRef, {
                            chatsData: userChatData.chatsData,
                        });
                    }
                });
            }
        } catch (err) {
            console.error(err.message);
            toast.error(err.message);
        }
    }

    useEffect(() => {
        if (messagesId) {
            const unsubscribe = onSnapshot(doc(db, 'messages', messagesId), (res) => {
                setMessages(res.data().messages.reverse());
            });

            return () => unsubscribe();
        }
    }, [messagesId]);


    return chatUser ? (
        <div className="chat-box">
            <div className="chat-user">
                <img src={chatUser.userData.avatar} alt={assets.profile_img.toString()} />
                <p>{chatUser.userData.name} <img src={assets.green_dot} alt={assets.green_dot.toString()} className="dot" /></p>
                <img src={assets.help_icon} alt={assets.help_icon.toString()} className="help" />
            </div>
            <div className="chat-msg">
                {messages.map((msg, idx) => (
                    <div key={idx} className={msg.sId === userData.id ? 's-msg' : 'r-msg'}>
                        {msg['image']
                            ? <img src={msg.image} alt="" className='msg-img' />
                            : <p className="msg">{msg.text}</p>
                        }
                        <div>
                            <img src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar} />
                            <p>{convertTimestamp(msg.createdAt)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input 
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text" 
                    placeholder="Send a message"
                />
                <input 
                    onChange={sendImage}
                    type="file" 
                    id="image" 
                    accept="image/png, image/jpeg" 
                    hidden 
                />
                <label htmlFor="image">
                    <img src={assets.gallery_icon} alt={assets.gallery_icon.toString()} />
                </label>
                <img onClick={sendMessage} src={assets.send_button} alt={assets.send_button.toString()} />
            </div>
        </div>
    )
    : <div className='chat-welcome'>
        <img src={assets.logo_icon} alt="" />
        <p>Chat anytime, anywhere...</p>
    </div>
}