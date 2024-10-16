import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-full-light.png";
import shareVideo from "../assets/share.mp4";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const responseGoogle = async (response) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const userData = jwtDecode(response.credential);
      localStorage.setItem("user", JSON.stringify(userData));

      const { name, sub, picture } = userData;
      const doc = {
        _id: sub,
        _type: "user",
        userName: name,
        image: picture,
      };

      await client.createIfNotExists(doc);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Failed to log in. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50">
          <div className="bg-slate-200 bg-opacity-30 mb-5 rounded-md p-3">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className={`bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled || loading}
                  aria-label="Sign in with Google"
                >
                  <FcGoogle className="mr-4" />
                  {loading ? "Signing in..." : "Sign in with Google"}
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
