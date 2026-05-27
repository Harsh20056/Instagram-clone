import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFeedPosts } from "../features/posts/postActions";
import { fetchSuggestions } from "../features/users/userActions";
import { useAuth } from "../hooks/useAuth";
import PostCard from "../components/posts/PostCard";
import PostSkeleton from "../components/posts/PostSkeleton";
import { getProfilePicture } from "../utils/profilePicture";
import { FiChevronRight } from "react-icons/fi";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { feedPosts, status } = useSelector((state) => state.posts);
  const { suggestions } = useSelector((state) => state.users);
  const storiesContainerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchFeedPosts());
    dispatch(fetchSuggestions());
  }, [dispatch]);

  const scrollStoriesRight = () => {
    if (storiesContainerRef.current) {
      storiesContainerRef.current.scrollBy({ left: 180, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] text-black antialiased flex justify-center">
      {/* Flex container for robust centering and layout spacing */}
      <div className="flex justify-around gap-8 max-w-full px-4 py-8 md:py-10 w-full">

        {/* Main Feed Column */}
        <div className="flex flex-col gap-5 w-full max-w-[470px] shrink-0">

          {/* High-Fidelity Stories Tray */}
          {suggestions.length > 0 && (
            <div className="relative w-full bg-white border border-gray-200 rounded-xl py-4.5 px-4 mb-2 flex items-center overflow-hidden">
              <div
                ref={storiesContainerRef}
                className="flex gap-4 overflow-x-auto scrollbar-none pr-8 w-full"
                style={{ scrollbarWidth: "none" }}
              >
                {suggestions.map((storyUser) => (
                  <Link to={`/profile/${storyUser._id}`} key={storyUser._id} className="flex flex-col items-center shrink-0 w-[74px] cursor-pointer">
                    <div className="w-[62px] h-[62px] rounded-full p-[2.5px] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                      <div className="w-full h-full rounded-full bg-white p-[2px]">
                        <img
                          src={getProfilePicture(storyUser.profilePicture)}
                          alt={storyUser.username}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-700 truncate w-full text-center mt-1.5 font-normal tracking-tight">
                      {storyUser.username}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Scroll Right Button */}
              {suggestions.length > 6 && (
                <button
                  onClick={scrollStoriesRight}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-white border border-gray-150 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:bg-gray-50 active:scale-95 text-gray-700 rounded-full p-1.5 transition-all z-10 cursor-pointer"
                >
                  <FiChevronRight size={18} />
                </button>
              )}
            </div>
          )}

          {/* Posts Stream */}
          <div className="flex flex-col gap-5 w-full">
            {status === "loading" ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : feedPosts.length > 0 ? (
              feedPosts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <div className="border border-gray-200 bg-white rounded-lg p-12 text-center mt-4">
                <p className="text-gray-500 text-sm font-medium">
                  No posts yet. Follow users to see their posts!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Recommendations & Context */}
        <div className="hidden lg:block w-[320px] shrink-0">
          <div className="sticky top-10 w-full pl-4">

            {/* Profile Card Context Header */}
            <div className="flex items-center gap-4.5 mb-5 mt-2.5">
              <Link to={`/profile/${user?._id}`} className="shrink-0">
                <img
                  src={getProfilePicture(user?.profilePicture)}
                  alt={user?.username}
                  className="w-11.5 h-11.5 rounded-full object-cover border border-gray-100"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/profile/${user?._id}`}>
                  <p className="font-semibold text-[14px] text-gray-900 hover:text-gray-600 truncate leading-tight">
                    {user?.username || "username"}
                  </p>
                </Link>
                <p className="text-gray-500 text-[14px] truncate mt-0.5">{user?.name || "Full Name"}</p>
              </div>
              <button type="button" className="text-xs font-semibold text-[#0095f6] hover:text-[#0081d6] cursor-pointer">
                Switch
              </button>
            </div>

            {/* Dynamic Suggestions Module */}
            <div className="mb-4">
              <div className="flex items-center justify-between py-1.5 mb-2.5">
                <h3 className="text-gray-500 font-semibold text-[14px] tracking-tight">
                  Suggested for you
                </h3>
                <button type="button" className="text-xs font-semibold text-gray-900 hover:text-gray-500 cursor-pointer">
                  See all
                </button>
              </div>

              {/* Suggestions Data Loop */}
              <div className="flex flex-col gap-4 pt-1">
                {suggestions.slice(0, 5).map((suggestedUser) => (
                  <div key={suggestedUser._id} className="flex items-center gap-3.5">
                    <Link to={`/profile/${suggestedUser._id}`} className="shrink-0">
                      <img
                        src={getProfilePicture(suggestedUser.profilePicture)}
                        alt={suggestedUser.username}
                        className="w-8.5 h-8.5 rounded-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/profile/${suggestedUser._id}`}>
                        <p className="font-semibold text-[14px] text-gray-900 hover:text-gray-600 truncate leading-tight">
                          {suggestedUser.username}
                        </p>
                      </Link>
                      <p className="text-gray-500 text-[12px] truncate mt-0.5">
                        Followed by {suggestedUser.followers?.length || 0} users
                      </p>
                    </div>
                    <Link
                      to={`/profile/${suggestedUser._id}`}
                      className="text-[#0095f6] hover:text-[#0081d6] text-xs font-semibold px-1"
                    >
                      Follow
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimal Web Application Info Footer */}
            <div className="mt-10 text-[11px] text-gray-400 tracking-wide leading-relaxed">
              <p className="hover:underline cursor-pointer uppercase text-[10px] tracking-widest mb-3.5 gap-x-1.5 gap-y-0.5 flex flex-wrap font-normal">
                About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified
              </p>
              <p className="uppercase text-[10px] tracking-widest font-normal text-gray-400">
                © 2026 INSTAGRAM FROM META
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;