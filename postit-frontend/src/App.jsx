import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./pages/Home";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const User =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    if (!User) navigate("/login");
  }, [navigate]);

  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
    >
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
