import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../context/AppContext';

import ChatBox from '../chat-box/ChatBox';
import LeftSidebar from '../left-sidebar/LeftSidebar';
import RightSidebar from '../right-sidebar/RightSidebar';
import './Chat.css';

export default function Chat() {
    const { chatData, userData } = useContext(AppContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (chatData && userData) {
            setLoading(false);
        }
    }, [chatData, userData]);

    return (
        <div className="chat">
            {loading 
                ? <p className="loading">Loading...</p>
                : (<div className="chat-container">
                    <LeftSidebar />
                    <ChatBox />
                    <RightSidebar />
                </div>)
            }
        </div>
    );
}