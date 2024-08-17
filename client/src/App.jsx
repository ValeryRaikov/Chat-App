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
import PrivateRoutes from "./components/private-routes/PrivateRoutes";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const { loadUserData } = useContext(AppContext);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await loadUserData(user.uid);

                const destination = location.pathname === '/' ? '/chat' : location.pathname;
                navigate(destination);
            } else {
                navigate('/');
            }
        });

        return () => unsubscribe(); 
    }, [navigate, loadUserData, location.pathname]);

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route element={<PrivateRoutes />}>
                    <Route path='/chat' element={<Chat />} />
                    <Route path='/profile' element={<ProfileUpdate />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
