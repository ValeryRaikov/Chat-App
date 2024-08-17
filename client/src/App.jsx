import { Routes, Route } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";
import ProfileUpdate from "./components/profile-update/ProfileUpdate";
import PrivateRoutes from "./components/private-routes/PrivateRoutes";

function App() {
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

export default App
