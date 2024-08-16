import ChatBox from '../chat-box/ChatBox';
import LeftSidebar from '../left-sidebar/LeftSidebar';
import RightSidebar from '../right-sidebar/RightSidebar';
import './Chat.css';

export default function Chat() {
    return (
        <div className="chat">
            <div className="chat-container">
                <LeftSidebar />
                <ChatBox />
                <RightSidebar />
            </div>
        </div>
    );
}