import { HomePage } from "./app/pages/HomePage";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./app/pages/Login";
import { SignUpPage } from "./app/pages/Signup";
import { Verified } from "./app/pages/VerifiedPage";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./app/hooks";
import { fetchState } from "./app/services/selectors";
import { createSelector } from "reselect";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
//
//
//
const stateSelector = createSelector(fetchState, (state) => ({
    state,
}));
//
function App() {
    //
    const navigate = useNavigate();
    let path = useLocation();
    const { state } = useAppSelector(stateSelector);

    useEffect(() => {
        if (
            (path.pathname.includes("/login") ||
                path.pathname.includes("/signup")) &&
            state.userData.token
        ) {
            navigate("/dashboard");
        } else if (
            (path.pathname.includes("/dashboard") ||
                path.pathname.includes("/verify")) &&
            !state.userData.token
        ) {
            navigate("/login");
        }
    }, [navigate, path.pathname, state.userData.token]);
    //
    //
    return (
        <>
            <ToastContainer />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<HomePage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/verify" element={<Verified />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default App;
