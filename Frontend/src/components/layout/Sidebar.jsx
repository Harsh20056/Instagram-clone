import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { logoutUser } from "../../features/auth/authActions";
import {
  FiHome,
  FiSearch,
  FiPlusSquare,
  FiUser,
  FiLogOut,
  FiCompass,
  FiMessageSquare
} from "react-icons/fi";

const Sidebar = ({ onCreatePost }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  // Expanded layout items matching realistic native layout scales
  const menuItems = [
    { icon: FiHome, label: "Home", path: "/" },
    { icon: FiSearch, label: "Search", path: "/search" },
    { icon: FiPlusSquare, label: "Create", action: onCreatePost },
    { icon: FiUser, label: "Profile", path: `/profile/${user?._id}` },
  ];

  return (
    <>
      {/* Desktop Sidebar Panel Drawer */}
      <div className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white z-50 px-3 pt-10 pb-5 font-sans antialiased justify-between">
        
        <div className="flex flex-col w-full">
          {/* Logo Heading Script Placeholder */}
          <div className="px-3 mb-9">
            <h1 className="text-xl font-bold tracking-wider font-serif text-black pl-1 cursor-pointer">
              Instagram
            </h1>
          </div>

          {/* Navigation Items Map Grid */}
          <nav className="flex flex-col gap-1 w-full">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <div key={index} className="w-full">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`flex items-center gap-4 px-3 py-3.5 rounded-xl transition-all duration-200 group relative hover:bg-gray-50 ${
                        isActive ? "font-bold text-black" : "text-black"
                      }`}
                    >
                      <item.icon
                        size={24}
                        className={`transition-transform duration-150 group-hover:scale-105 ${
                          isActive ? "text-black" : "text-black"
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      <span className={`text-[16px] tracking-wide ${isActive ? "font-bold" : "font-normal"}`}>
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={item.action}
                      className="flex items-center gap-4 px-3 py-3.5 rounded-xl w-full text-left transition-all duration-200 group hover:bg-gray-50 text-black"
                    >
                      <item.icon size={24} className="transition-transform duration-150 group-hover:scale-105" />
                      <span className="text-[16px] tracking-wide font-normal">{item.label}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Action Bottom Settings Menu Control */}
        <div className="w-full pt-2">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-4 px-3 py-3.5 rounded-xl w-full text-left text-black hover:bg-gray-50 transition-all duration-200 group"
          >
            <FiLogOut size={24} className="text-black group-hover:translate-x-0.5 transition-transform" />
            <span className="text-[16px] font-normal tracking-wide">
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar Tray */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-14 safe-bottom">
        <nav className="flex justify-around items-center h-full max-w-md mx-auto px-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={index} className="flex items-center justify-center">
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`flex items-center justify-center p-2.5 rounded-lg active:scale-95 transition-transform ${
                      isActive ? "text-black" : "text-gray-500"
                    }`}
                  >
                    <item.icon
                      size={24}
                      strokeWidth={isActive ? 2.5 : 2}
                      className="transition-colors"
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={item.action}
                    className="flex items-center justify-center p-2.5 text-gray-500 active:scale-95 transition-transform"
                  >
                    <item.icon size={24} />
                  </button>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;