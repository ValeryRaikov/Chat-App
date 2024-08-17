import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export default function PrivateRoutes() {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                navigate('/chat');
            } else {
                navigate('/');
            }
        });
    }, []);

    return (
        <Outlet />
    );
}