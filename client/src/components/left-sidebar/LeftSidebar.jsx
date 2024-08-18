import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

import './LeftSidebar.css';
import assets from '../../assets/assets';

import { AppContext } from '../../context/AppContext';

export default function LeftSidebar() {
    const navigate = useNavigate();
    const { userData } = useContext(AppContext);
    const [user, setUser] = useState(null);
    const [showSearch, setShowSearch] = useState(false);

    const inputHandler = async () => {
        try {
            const input = e.target.value;

            if (input) {
                setShowSearch(true);
                const userRef = collection(db, 'users');
                const q = query(userRef, where('username', '==', input.toLowerCase()));
                const querySnap = await getDocs(q);

                if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
                    setUser(querySnap.docs[0].data());
                } else {
                    setUser(null);
                }
            } else {
                setShowSearch(false);
            }
        } catch (err) {
            
        }
    }

    return (
        <div className="ls">
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
                    ? <div className="friends add-user">
                        <img src={user.avatar} alt="" />
                        <p>{user.name}</p>
                    </div>
                    : Array(12).fill('').map((item, idx) => (
                        <div key={idx} className="friends">
                            <img src={assets.profile_img} alt="" />
                            <div>
                                <p>Richard Stamford</p>
                                <span>Hello, how are you?</span>
                            </div>
                        </div>
                    ))
                }
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