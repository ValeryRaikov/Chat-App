import { useState } from 'react';

import './ProfileUpdate.css';
import assets from '../../assets/assets';

export default function ProfileUpdate() {
    const [image, setImage] = useState(false);

    return (
        <div className="profile">
            <div className="profile-container">
                <form>
                    <h3>Profile Details</h3>
                    <label htmlFor="avatar">
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden />
                        <img src={image 
                                    ? URL.createObjectURL(image) 
                                    : assets.avatar_icon} 
                        alt={assets.avatar_icon.toString()} />
                        Upload profile image
                    </label>
                    <input type="text" placeholder="Your name" required />
                    <textarea placeholder="Write your profile bio" required></textarea>
                    <button type="submit">Save</button>
                </form>
                <img src={image 
                            ? URL.createObjectURL(image) 
                            : assets.logo_icon} 
                alt={assets.logo_icon.toString()} className="profile-pic" />
            </div>
        </div>
    );
}