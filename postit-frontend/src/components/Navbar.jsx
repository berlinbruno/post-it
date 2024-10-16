import { CameraIcon, SearchIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      {/* Search Bar */}
      <div className="flex items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <SearchIcon fontSize={21} className="ml-1 text-gray-500" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* User Profile & Create Pin */}
      <div className="flex flex-shrink-0 gap-3">
        <Link
          to={`/user-profile/${user?._id}`}
          className="hidden md:block"
          aria-label="User Profile"
        >
          <img
            src={user.image}
            alt="User Profile"
            loading="lazy"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 hover:border-black transition-all"
          />
        </Link>
        <Link
          to="/create-pin"
          className="bg-black text-white rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-800 transition-all"
          aria-label="Create Post"
        >
          <CameraIcon />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
