import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUsers } from "../features/users/userActions";
import { clearSearchResults } from "../features/users/userSlice";
import { FiSearch } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import { getProfilePicture } from "../utils/profilePicture";

const Search = () => {
  const dispatch = useDispatch();
  const { searchResults, searchStatus } = useSelector((state) => state.users);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length >= 2) {
      const timer = setTimeout(() => {
        dispatch(searchUsers(query));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      dispatch(clearSearchResults());
    }
  }, [query, dispatch]);

  const handleClear = () => {
    setQuery("");
    dispatch(clearSearchResults());
  };

  return (
    <div className="min-h-screen w-full bg-white text-black font-sans antialiased">
      {/* Container aligned with Instagram's fixed sidebar exploration flow */}
      <div className="max-w-[400px] mx-auto lg:mx-0 min-h-screen border-r border-gray-200 bg-white px-4 pt-6 pb-4 flex flex-col">

        {/* Component Header Title */}
        <h1 className="text-[24px] font-bold px-2 mb-8 tracking-wide text-black">
          Search
        </h1>

        {/* Input Text Box Bar */}
        <div className="relative w-full mb-6">
          <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2.5 focus-within:ring-1 focus-within:ring-gray-300 transition-all">
            <FiSearch size={18} className="text-gray-500 shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[16px] text-black placeholder-gray-500"
              autoFocus
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-500 hover:text-gray-700 transition-colors shrink-0"
              >
                <IoMdCloseCircle size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic State Feedback Messaging Panel */}
        <div className="flex-1 flex flex-col">
          {query.length > 0 && query.length < 2 && (
            <p className="text-gray-500 text-sm text-center mt-4 px-4">
              Type at least 2 characters to search
            </p>
          )}

          {searchStatus === "loading" && (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-transparent"></div>
            </div>
          )}

          {/* User Results Node Array mapping */}
          {searchResults.length > 0 && (
            <div className="flex flex-col w-full">
              {searchResults.map((user) => (
                <Link
                  key={user._id}
                  to={`/profile/${user._id}`}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group"
                >
                  <img
                    src={getProfilePicture(user.profilePicture)}
                    alt={user.username}
                    className="w-11 h-11 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-black group-hover:text-gray-700 truncate">
                      {user.username}
                    </p>
                    <p className="text-gray-500 text-sm truncate">
                      {user.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {query.length >= 2 && searchStatus === "succeeded" && searchResults.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <p className="text-black font-semibold text-sm">No results found.</p>
              <p className="text-gray-500 text-xs mt-1">
                Make sure everything is spelled correctly.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Search;