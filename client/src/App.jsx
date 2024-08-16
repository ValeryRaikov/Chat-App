import { Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";
import ProfileUpdate from "./components/profile-update/ProfileUpdate";
import PrivateRoutes from "./components/private-routes/PrivateRoutes";

function App() {
    return (
        <>
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
