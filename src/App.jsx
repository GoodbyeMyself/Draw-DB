import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Editor from "./pages/Editor";
import Templates from "./pages/Templates";
import Shortcuts from "./pages/Shortcuts";
import LandingPage from "./pages/LandingPage";
import SettingsContextProvider from "./context/SettingsContext";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <SettingsContextProvider>
            <BrowserRouter>
                <RestoreScroll />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/editor" element={<Editor />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/shortcuts" element={<Shortcuts />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </SettingsContextProvider>
    );
}

function RestoreScroll() {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scroll(0, 0);
    }, [location.pathname]);
    return null;
}
