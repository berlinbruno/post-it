import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LogOutIcon } from "lucide-react";
import { client } from "../client";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-24 outline-none transition duration-200 hover:shadow-lg";
const notActiveBtnStyles =
  "bg-gray-300 text-black font-bold p-2 rounded-full w-24 outline-none transition duration-200 hover:shadow-lg";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  const UserInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    const fetchPins = async () => {
      const pinsQuery = text === "Created"
        ? userCreatedPinsQuery(userId)
        : userSavedPinsQuery(userId);

      const data = await client.fetch(pinsQuery);
      setPins(data);
    };

    fetchPins();
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return <Spinner message="Loading profile..." />;

  return (
    <div className="relative pb-5 h-full flex flex-col items-center w-full">
      <div className="relative flex flex-col mb-7 w-full">
        <div className="flex flex-col justify-center items-center w-full">
          <img
            className="w-full h-[200px] 2xl:h-[240px] shadow-lg object-cover rounded-t-lg"
            src="https://doodleipsum.com/700x394/abstract?i=e2dedc7bc9f1a630e177355aa7b1a6c9"
            alt="user-background"
          />
          <img
            className="rounded-full w-24 h-24 -mt-12 shadow-xl object-cover border-4 border-white"
            src={user.image}
            alt="user-avatar"
          />
        </div>
        <h1 className="font-bold text-3xl text-center mt-3">{user.userName}</h1>
        {user.bio && <p className="text-gray-600 text-center mt-2">{user.bio}</p>}
        <div className="absolute top-0 right-0 p-2">
          {userId === UserInfo.sub && (
            <button
              type="button"
              className="bg-white p-2 rounded-full shadow-md hover:shadow-lg"
              onClick={logout}
            >
              <LogOutIcon color="red" fontSize={21} />
            </button>
          )}
        </div>
      </div>
      <div className="text-center mb-5 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setText("Created");
            setActiveBtn("created");
          }}
          className={`${activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles}`}
        >
          Created
        </button>
        <button
          type="button"
          onClick={() => {
            setText("Saved");
            setActiveBtn("saved");
          }}
          className={`${activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles}`}
        >
          Saved
        </button>
      </div>

      {pins?.length ? (
        <div className="w-full px-2">
          <MasonryLayout pins={pins} />
        </div>
      ) : (
        <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
          No Pins Found!
        </div>
      )}
    </div>
  );
};

export default UserProfile;
