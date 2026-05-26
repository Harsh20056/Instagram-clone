import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFeedPosts } from "../features/posts/postActions";
import { fetchSuggestions } from "../features/users/userActions";
import { useAuth } from "../hooks/useAuth";
import PostCard from "../components/posts/PostCard";
import PostSkeleton from "../components/posts/PostSkeleton";
import { getProfilePicture } from "../utils/profilePicture";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { feedPosts, status } = useSelector((state) => state.posts);
  const { suggestions } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchFeedPosts());
    dispatch(fetchSuggestions());
  }, [dispatch]);

  return (
    <div className="min-h-screen w-full bg-white text-black antialiased">
      {/* Maximum desktop width match (approx 935px) */}
      <div className="max-w-[935px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Feed Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 max-w-[470px] mx-auto lg:mx-0 w-full">
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

          {/* Sidebar - Recommendations & Context */}
          <div className="hidden lg:block">
            <div className="fixed w-[320px] pl-4">
              
              {/* Profile Card Context Header */}
              <div className="flex items-center gap-4 mb-5 mt-2">
                <Link to={`/profile/${user?._id}`} className="shrink-0">
                  <img
                    src={getProfilePicture(user?.profilePicture)}
                    alt={user?.username}
                    className="w-11 h-11 rounded-full object-cover border border-gray-200"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/profile/${user?._id}`}>
                    <p className="font-semibold text-sm text-black hover:text-gray-600 truncate">
                      {user?.username || "username"}
                    </p>
                  </Link>
                  <p className="text-gray-500 text-sm truncate">{user?.name || "Full Name"}</p>
                </div>
                <button type="button" className="text-xs font-semibold text-instagram-blue hover:text-blue-800">
                  Switch
                </button>
              </div>

              {/* Dynamic Suggestions Module */}
              <div className="mb-4">
                <div className="flex items-center justify-between py-1.5 mb-2">
                  <h3 className="text-gray-500 font-semibold text-sm tracking-wide">
                    Suggested for you
                  </h3>
                  <button type="button" className="text-xs font-semibold text-black hover:text-gray-500">
                    See All
                  </button>
                </div>

                {/* Suggestions Data Loop */}
                <div className="flex flex-col gap-3.5 pt-1">
                  {suggestions.slice(0, 5).map((suggestedUser) => (
                    <div key={suggestedUser._id} className="flex items-center gap-3">
                      <Link to={`/profile/${suggestedUser._id}`} className="shrink-0">
                        <img
                          src={getProfilePicture(suggestedUser.profilePicture)}
                          alt={suggestedUser.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/profile/${suggestedUser._id}`}>
                          <p className="font-semibold text-sm text-black hover:text-gray-600 truncate">
                            {suggestedUser.username}
                          </p>
                        </Link>
                        <p className="text-gray-500 text-xs truncate">
                          Followed by {suggestedUser.followers?.length || 0} users
                        </p>
                      </div>
                      <Link
                        to={`/profile/${suggestedUser._id}`}
                        className="text-instagram-blue hover:text-blue-800 text-xs font-semibold px-1"
                      >
                        Follow
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimal Web Application Info Footer */}
              <div className="mt-9 text-[11px] text-gray-400 tracking-wide leading-relaxed">
                <p className="hover:underline cursor-pointer uppercase text-[10px] tracking-widest mb-3 gap-1 flex flex-wrap">
                  About • Help • Press • API • Jobs • Privacy • Terms • Locations • Language • Meta Verified
                </p>
                <p className="uppercase text-[10px] tracking-wider font-medium">
                  © 2026 INSTAGRAM CLONE FROM META
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;