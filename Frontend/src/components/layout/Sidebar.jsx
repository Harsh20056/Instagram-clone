import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../features/auth/authActions";
import {
  FiInstagram,
  FiSearch,
  FiCompass,
  FiHeart,
  FiPlusSquare,
  FiMenu,
  FiLogOut
} from "react-icons/fi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { RiClapperboardLine, RiClapperboardFill } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import { TbBrandThreads } from "react-icons/tb";
import { getProfilePicture } from "../../utils/profilePicture";

const Sidebar = ({ onCreatePost }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useAuth();

  const isHomeActive = location.pathname === "/";

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const isProfileActive = location.pathname === `/profile/${user?._id}`;

  return (
    <>
      {/* Desktop Slim Sidebar Panel */}
      <div className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-[72px] border-r border-gray-200 bg-white z-50 py-6 antialiased justify-between items-center">
        
        {/* Top Logo and Main Nav Group */}
        <div className="flex flex-col items-center gap-7 w-full">
          {/* Logo Camera Icon */}
          <Link to="/" className="mb-2 p-3 hover:scale-105 transition-transform duration-200">
            <FiInstagram size={26} className="text-black" strokeWidth={2} />
          </Link>

          {/* Navigation Items (Vertical Icon List) */}
          <nav className="flex flex-col gap-5 items-center w-full">
            {/* Home */}
            <Link
              to="/"
              className={`p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group relative ${
                isHomeActive ? "text-black" : "text-gray-800"
              }`}
            >
              {isHomeActive ? (
                <GoHomeFill size={26} className="text-black" />
              ) : (
                <GoHome size={26} className="text-black group-hover:scale-105 transition-transform" />
              )}
            </Link>

            {/* Reels */}
            <button
              type="button"
              className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group text-black"
            >
              <RiClapperboardLine size={26} className="group-hover:scale-105 transition-transform" />
            </button>

            {/* Messages */}
            <button
              type="button"
              className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group text-black"
            >
              <FiSend size={24} className="group-hover:scale-105 transition-transform transform rotate-45 -translate-y-0.5" />
            </button>

            {/* Search */}
            <Link
              to="/search"
              className={`p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group ${
                location.pathname === "/search" ? "text-black" : "text-gray-800"
              }`}
            >
              <FiSearch size={26} className="group-hover:scale-105 transition-transform text-black" />
            </Link>

            {/* Explore */}
            <button
              type="button"
              className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group text-black"
            >
              <FiCompass size={26} className="group-hover:scale-105 transition-transform" />
            </button>

            {/* Notifications (Heart) */}
            <button
              type="button"
              className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group text-black"
            >
              <FiHeart size={26} className="group-hover:scale-105 transition-transform" />
            </button>

            {/* Create */}
            <button
              type="button"
              onClick={onCreatePost}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group text-black"
            >
              <FiPlusSquare size={26} className="group-hover:scale-105 transition-transform" />
            </button>

            {/* Profile (Round Avatar) */}
            <Link
              to={`/profile/${user?._id}`}
              className={`p-1 rounded-full hover:scale-105 transition-all duration-200 shrink-0 ${
                isProfileActive ? "ring-2 ring-black" : "hover:ring-1 hover:ring-gray-300"
              }`}
            >
              <img
                src={getProfilePicture(user?.profilePicture)}
                alt={user?.username}
                className="w-7 h-7 rounded-full object-cover"
              />
            </Link>
          </nav>
        </div>

        {/* Bottom Actions group (Hamburger Menu & Threads & Logout) */}
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Hamburger Menu */}
          <button
            type="button"
            className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group text-black cursor-pointer"
          >
            <FiMenu size={26} className="group-hover:scale-105 transition-transform" />
          </button>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="p-3 rounded-full hover:bg-red-50 text-red-500 hover:text-red-600 transition-all duration-200 group cursor-pointer active:scale-90"
          >
            <FiLogOut size={26} className="group-hover:scale-105 transition-transform" />
          </button>

          {/* Threads Logo at the very bottom */}
          <button
            type="button"
            className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 group text-black cursor-pointer"
          >
            <TbBrandThreads size={26} className="group-hover:scale-105 transition-transform" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar Tray (Unmodified Navigation Flow, but Styled Premium) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-14 safe-bottom">
        <nav className="flex justify-around items-center h-full max-w-md mx-auto px-2">
          {/* Home */}
          <Link
            to="/"
            className={`flex items-center justify-center p-2.5 rounded-lg active:scale-95 transition-transform ${
              isHomeActive ? "text-black" : "text-gray-400"
            }`}
          >
            {isHomeActive ? <GoHomeFill size={26} /> : <GoHome size={26} />}
          </Link>

          {/* Search */}
          <Link
            to="/search"
            className={`flex items-center justify-center p-2.5 rounded-lg active:scale-95 transition-transform ${
              location.pathname === "/search" ? "text-black" : "text-gray-400"
            }`}
          >
            <FiSearch size={26} />
          </Link>

          {/* Create */}
          <button
            type="button"
            onClick={onCreatePost}
            className="flex items-center justify-center p-2.5 text-gray-400 active:scale-95 transition-transform"
          >
            <FiPlusSquare size={26} />
          </button>

          {/* Profile */}
          <Link
            to={`/profile/${user?._id}`}
            className={`flex items-center justify-center p-1.5 rounded-full shrink-0 active:scale-95 transition-transform ${
              isProfileActive ? "ring-2 ring-black" : "text-gray-400"
            }`}
          >
            <img
              src={getProfilePicture(user?.profilePicture)}
              alt={user?.username}
              className="w-6 h-6 rounded-full object-cover"
            />
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className="flex items-center justify-center p-2.5 text-red-500 hover:text-red-700 active:scale-95 transition-transform cursor-pointer"
          >
            <FiLogOut size={26} />
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;