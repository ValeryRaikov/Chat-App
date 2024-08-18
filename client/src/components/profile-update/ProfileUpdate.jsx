import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import './ProfileUpdate.css';
import assets from '../../assets/assets';
import upload from '../../lib/upload';

export default function ProfileUpdate() {
    const navigate = useNavigate();
    const [image, setImage] = useState(false);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [uid, setUid] = useState('');
    const [prevImage, setPrevImage] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUid(user.uid);
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.data().name) {
                    setName(docSnap.data().name);
                }

                if (docSnap.data().bio) {
                    setBio(docSnap.data().bio);
                }

                if (docSnap.data().avatar) {
                    setPrevImage(docSnap.data().avatar);
                }
            } else {
                navigate('/');
            }
        });
    }, []);

    const profileUpdate = async (e) => {
        e.preventDefault();

        try {
            if (!prevImage && !image) {
                toast.error('Upload profile picture!');
            }

            const docRef = doc(db, 'users', uid);

            if (image) {
                const imgUrl = await upload(image);
                setPrevImage(imgUrl);
                await updateDoc(docRef, {
                    avatar: imgUrl,
                    bio,
                    name,
                });
            } else {
                await updateDoc(docRef, {
                    bio,
                    name,
                });
            }
        } catch (err) {
            
        }
    }

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const bioChangeHandler = (e) => {
        setBio(e.target.value);
    }

    return (
        <div className="profile">
            <div className="profile-container">
                <form onSubmit={profileUpdate}>
                    <h3>Profile Details</h3>
                    <label htmlFor="avatar">
                        <input 
                            onChange={(e) => setImage(e.target.files[0])} 
                            type="file" 
                            id="avatar" 
                            accept=".png, .jpg, .jpeg" 
                            hidden 
                        />
                        <img src={image 
                                    ? URL.createObjectURL(image) 
                                    : assets.avatar_icon} 
                        alt={assets.avatar_icon.toString()} />
                        Upload profile image
                    </label>
                    <input 
                        onChange={nameChangeHandler}
                        value={name}
                        type="text" 
                        placeholder="Your name" 
                        required 
                    />
                    <textarea 
                        onChange={bioChangeHandler}
                        value={bio}
                        placeholder="Write your profile bio" 
                        required
                    >
                    </textarea>
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