import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-full-light.png";
import shareVideo from "../assets/share.mp4";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem(
      "user",
      JSON.stringify(jwtDecode(response.credential))
    );
    const { name, sub, picture } = jwtDecode(response.credential);
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
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

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className=" bg-slate-200 bg-opacity-30 mb-5 rounded-md">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className=" shadow-2xl">
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
