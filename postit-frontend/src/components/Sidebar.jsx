import { Home } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-full-light.png";
import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ closeToggle, user }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
          aria-label="Go to Home"
        >
          <img src={logo} alt="logo" className="w-full" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
            aria-label="Home"
          >
            <Home />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
              aria-label={`View ${category.name} category`}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
                alt={`${category.name} category`}
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user ? (
        <Link
          to={`/user-profile/${user._id}`}
          className="flex my-5 mx-3 mb-3 p-2 gap-2 items-center bg-white rounded-lg shadow-lg"
          onClick={handleCloseSidebar}
          aria-label="User Profile"
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p>{user.userName}</p>
        </Link>
      ) : (
        <div className="flex my-5 mx-3 mb-3 p-2 gap-2 items-center bg-white rounded-lg shadow-lg">
          <p className="text-gray-500">Loading user data...</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
