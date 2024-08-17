import './ChatBox.css';
import assets from '../../assets/assets';

export default function ChatBox() {
    return (
        <div className="chat-box">
            <div className="chat-user">
                <img src={assets.profile_img} alt={assets.profile_img.toString()} />
                <p>Meggie Phill <img src={assets.green_dot} alt={assets.green_dot.toString()} className="dot" /></p>
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
    );
}