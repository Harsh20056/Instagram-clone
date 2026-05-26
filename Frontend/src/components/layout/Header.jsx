import { Link } from "react-router-dom";
import { FiSearch, FiHeart } from "react-icons/fi";

const Header = () => {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-instagram-border z-40 h-14">
      <div className="flex items-center justify-between px-4 h-full">
        <h1 className="text-xl font-bold">Instagram</h1>
        <div className="flex items-center gap-4">
          <Link to="/search">
            <FiSearch size={24} />
          </Link>
          <FiHeart size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
