import './LeftSidebar.css';
import assets from '../../assets/assets';

export default function LeftSidebar() {
    return (
        <div className="ls">
            <div className="ls-top">
                <div className="ls-nav">
                    <img src={assets.logo} alt={assets.logo.toString()} className="logo" />
                    <div className="menu">
                        <img src={assets.menu_icon} alt={assets.menu_icon.toString()} />
                    </div>
                </div>
                <div className="ls-search">
                    <img src={assets.search_icon} alt={assets.search_icon.toString()} />
                    <input type="text" placeholder="Search here..." />
                </div>
            </div>
            <div className="ls-list">
                <div className="friends">
                    <img src={assets.profile_img} alt={assets.profile_img.toString()} />
                    <div>
                        <p>Valery Raikov</p>
                        <span>Hello, how are you?</span>
                    </div>
                </div>
            </div>
        </div>
    );
}