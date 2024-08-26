import { useContext, useEffect, useState } from 'react';

import { logout } from '../config/firebase';

import { AppContext } from '../../context/AppContext';

import './RightSidebar.css';
import assets from '../../assets/assets';

export default function RightSidebar() {
    const {
        chatUser,
        messages
    } = useContext(AppContext);
    const [msgImages, setMsgImages] = useState([]);

    useEffect(() => {
        const tempArr = [];
        messages.map((msg) => {
            if (msg.image) {
                tempArr.push(msg.image);
            }
        });

        setMsgImages(tempArr);
    }, [messages]);

    return chatUser ? (
        <div className="rs">
            <div className="rs-profile">
                <img src={chatUser.userData.avatar} alt={assets.profile_img.toString()} />
                <h3>{Date.now() - chatUser.userData.lastSeen <= 70000 
                    ? <img src={assets.green_dot} alt={assets.green_dot.toString()} className="dot" />
                    : null
                } {chatUser.userData.name}</h3>
                <p>{chatUser.userData.bio}</p>
            </div>
            <hr />
            <div className="rs-media">
                <p>Media</p>
                <div>
                    {msgImages.map((url, idx) => (
                        <img 
                        onClick={() => window.open(url)}
                        key={idx} 
                        src={url} 
                        alt="" 
                        />
                    ))}
                </div>
            </div>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
    : (
        <div className="rs">
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}