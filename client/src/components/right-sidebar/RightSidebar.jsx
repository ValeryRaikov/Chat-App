import './RightSidebar.css';
import assets from '../../assets/assets';

export default function RightSidebar() {
    return (
        <div className="rs">
            <div className="rs-profile">
                <img src={assets.profile_img} alt={assets.profile_img.toString()} />
                <h3>Valery Raikov <img src={assets.green_dot} alt={assets.green_dot.toString()} className="dot" /></h3>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <hr />
            <div className="rs-media">
                <p>Media</p>
                <div>
                    <img src={assets.pic1} alt="" />
                    <img src={assets.pic2} alt="" />
                    <img src={assets.pic3} alt="" />
                    <img src={assets.pic4} alt="" />
                    <img src={assets.pic1} alt="" />
                    <img src={assets.pic2} alt="" />
                </div>
            </div>
            <button>Logout</button>
        </div>
    );
}