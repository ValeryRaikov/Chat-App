import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';

import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

import './ChatBox.css';
import assets from '../../assets/assets';

export default function ChatBox() {
    const {
        userData,
        messagesId,
        chatUser,
        messages,
        setMessages,
    } = useContext(AppContext);

    const [input, setInput] = useState('');

    useEffect(() => {
        if (messagesId) {
            const unsubscribe = onSnapshot(doc(db, 'messages', messagesId), (res) => {
                setMessages(res.data().messages.reverse());
                console.log(res.data().messages.reverse());
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
                <div className="s-msg">
                    <p className="msg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, corporis?</p>
                    <div>
                        <img src={assets.profile_img} alt={assets.profile_img.toString()} />
                        <p>2: 30 PM</p>
                    </div>
                </div>
                <div className="s-msg">
                    <img src={assets.pic1} alt="" className="msg-img" />
                    <div>
                        <img src={assets.profile_img} alt={assets.profile_img.toString()} />
                        <p>2: 30 PM</p>
                    </div>
                </div>
                <div className="r-msg">
                    <p className="msg">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, corporis?</p>
                    <div>
                        <img src={assets.profile_img} alt={assets.profile_img.toString()} />
                        <p>2: 30 PM</p>
                    </div>
                </div>
            </div>
            <div className="chat-input">
                <input type="text" placeholder="Send a message" />
                <input type="file" id="image" accept="image/png, image/jpeg" hidden />
                <label htmlFor="image">
                    <img src={assets.gallery_icon} alt={assets.gallery_icon.toString()} />
                </label>
                <img src={assets.send_button} alt={assets.send_button.toString()} />
            </div>
        </div>
    )
    : <div className='chat-welcome'>
        <img src={assets.logo_icon} alt="" />
        <p>Chat anytime, anywhere...</p>
    </div>
}