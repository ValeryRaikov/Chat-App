import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/config/firebase";

import { AppContext } from "./context/AppContext";

import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";
import ProfileUpdate from "./components/profile-update/ProfileUpdate";

function App() {
    const navigate = useNavigate();
    const { loadUserData } = useContext(AppContext);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                await loadUserData(user.uid);
                navigate('/chat');
            } else {
                navigate('/');
            }
        });
    }, []);

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/profile' element={<ProfileUpdate />} />
            </Routes>
        </>
    );
}

export default App;
