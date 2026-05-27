import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../features/auth/authActions";
import {
  fetchUserProfile,
  fetchUserPosts,
  toggleFollowUser,
  fetchFollowers,
  fetchFollowings,
} from "../features/users/userActions";
import { FiGrid, FiBookmark, FiSettings, FiUser, FiLogOut } from "react-icons/fi";
import { RiRepeat2Line } from "react-icons/ri";
import { getProfilePicture } from "../utils/profilePicture";
import CommentSection from "../components/posts/CommentSection";

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user: currentUser } = useAuth();
  const { userProfile, userPosts, followers, followings } = useSelector((state) => state.users);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedPostForComments, setSelectedPostForComments] = useState(null);

  const isOwnProfile = !userId || userId === currentUser?._id;
  const profileId = userId || currentUser?._id;

  useEffect(() => {
    if (profileId) {
      dispatch(fetchUserProfile(isOwnProfile ? null : profileId));
      dispatch(fetchUserPosts(isOwnProfile ? null : profileId));
    }
  }, [dispatch, profileId, isOwnProfile]);

  const handleFollow = () => {
    dispatch(toggleFollowUser(userProfile._id));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleShowFollowers = () => {
    dispatch(fetchFollowers(isOwnProfile ? null : profileId));
    setShowFollowers(true);
  };

  const handleShowFollowings = () => {
    dispatch(fetchFollowings(isOwnProfile ? null : profileId));
    setShowFollowings(true);
  };

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fafafa]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0095f6]"></div>
      </div>
    );
  }

  const isFollowing = userProfile.followers?.some((f) => {
    const followerId = f && typeof f === "object" ? (f._id || f.id) : f;
    const currentId = currentUser?._id || currentUser?.id;
    return followerId && currentId && String(followerId) === String(currentId);
  }) || false;

  return (
    <div className="max-w-[935px] mx-auto px-5 py-8 md:py-10 bg-[#fafafa] min-h-screen text-black antialiased">
      {/* Profile Header */}
      <div className="flex flex-row md:flex-row gap-6 md:gap-20 mb-8 md:mb-12 items-start md:items-center px-2">
        {/* Profile Picture */}
        <div className="relative shrink-0 flex justify-center mt-2.5">
          <img
            src={getProfilePicture(userProfile.profilePicture)}
            alt={userProfile.username}
            className="w-[78px] h-[78px] md:w-[150px] md:h-[150px] rounded-full object-cover border border-gray-200"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          {/* Username & Settings */}
          <div className="flex items-center gap-3.5 mb-4">
            <h2 className="text-[20px] font-bold text-gray-900 truncate tracking-tight">{userProfile.username}</h2>
            <button className="text-gray-800 hover:text-black cursor-pointer p-1">
              <FiSettings size={20} strokeWidth={2.2} />
            </button>
            {isOwnProfile && (
              <button
                onClick={handleLogout}
                title="Logout"
                className="text-red-500 hover:text-red-700 active:scale-95 transition-transform cursor-pointer p-1.5 rounded-full hover:bg-red-55 ml-1.5"
              >
                <FiLogOut size={20} />
              </button>
            )}
          </div>

          {/* Full Name & Bio details */}
          <div className="text-[14px] leading-relaxed mb-4">
            <p className="font-semibold text-gray-900 flex items-center">
              {userProfile.name}
            </p>
            
            {/* Stats row - mobile view hidden or styled inline */}
            <div className="flex gap-6 my-2.5 text-gray-900 select-none">
              <div>
                <span className="font-semibold">{userPosts.length}</span>
                <span className="text-gray-700 font-normal ml-1">posts</span>
              </div>
              <button onClick={handleShowFollowers} className="hover:text-gray-600 cursor-pointer">
                <span className="font-semibold">{userProfile.followers?.length || 0}</span>
                <span className="text-gray-700 font-normal ml-1">followers</span>
              </button>
              <button onClick={handleShowFollowings} className="hover:text-gray-600 cursor-pointer">
                <span className="font-semibold">{userProfile.followings?.length || 0}</span>
                <span className="text-gray-700 font-normal ml-1">following</span>
              </button>
            </div>

            {/* Dynamic details - private email & mobile only shown to owner */}
            {isOwnProfile && (userProfile.email || userProfile.mobile) && (
              <div className="flex flex-col gap-0.5 mt-2 font-normal text-gray-900">
                {userProfile.email && (
                  <p className="text-sm text-gray-500">{userProfile.email}</p>
                )}
                {userProfile.mobile && (
                  <p className="text-sm text-gray-500">{userProfile.mobile}</p>
                )}
              </div>
            )}
          </div>

          {/* Edit Buttons - Side by Side */}
          <div className="flex gap-2 w-full mt-5 max-w-[420px]">
            {isOwnProfile ? (
              <>
                <Link to="/edit-profile" className="flex-1">
                  <button className="w-full bg-[#efefef] text-gray-900 hover:bg-[#dbdbdb] font-semibold text-[14px] py-2.5 px-4 rounded-xl text-center cursor-pointer transition-colors duration-150 select-none">
                    Edit Profile
                  </button>
                </Link>
                <button className="flex-1 bg-[#efefef] text-gray-900 hover:bg-[#dbdbdb] font-semibold text-[14px] py-2.5 px-4 rounded-xl text-center cursor-pointer transition-colors duration-150 select-none">
                  View archive
                </button>
              </>
            ) : (
              <button
                onClick={handleFollow}
                className={`flex-1 font-semibold text-[14px] py-2.5 px-4 rounded-xl text-center cursor-pointer transition-all duration-150 select-none ${
                  isFollowing
                    ? "bg-[#efefef] text-gray-900 hover:bg-[#dbdbdb]"
                    : "bg-[#0095f6] text-white hover:bg-[#0081d6]"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Highlights Module */}
      <div className="flex flex-col items-center mt-8 mb-6 pl-2.5 w-20 shrink-0">
        <div className="w-[72px] h-[72px] rounded-full border border-gray-250 flex items-center justify-center bg-white cursor-pointer hover:bg-gray-50 active:scale-95 transition-all">
          <span className="text-[32px] text-gray-400 font-light -translate-y-0.5 select-none">+</span>
        </div>
        <span className="text-[12px] font-semibold text-gray-900 mt-2 select-none">New</span>
      </div>

      {/* Posts Section with Redesigned Icon-Only Tabs */}
      <div className="border-t border-gray-200 mt-10">
        {/* Tab Selection Row */}
        <div className="flex justify-center gap-14 md:gap-18 mb-4">
          {/* Posts Tab */}
          <button 
            onClick={() => setActiveTab("posts")}
            className={`flex items-center justify-center py-4.5 -mt-[1px] cursor-pointer transition-colors ${
              activeTab === "posts" 
                ? "border-t border-black text-black" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FiGrid size={18} strokeWidth={activeTab === "posts" ? 2.5 : 2} />
          </button>

          {/* Saved Tab */}
          <button 
            onClick={() => setActiveTab("saved")}
            className={`flex items-center justify-center py-4.5 -mt-[1px] cursor-pointer transition-colors ${
              activeTab === "saved" 
                ? "border-t border-black text-black" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FiBookmark size={18} strokeWidth={activeTab === "saved" ? 2.5 : 2} />
          </button>

          {/* Reposts / Repost Tab */}
          <button 
            onClick={() => setActiveTab("reposts")}
            className={`flex items-center justify-center py-4.5 -mt-[1px] cursor-pointer transition-colors ${
              activeTab === "reposts" 
                ? "border-t border-black text-black" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <RiRepeat2Line size={19} strokeWidth={activeTab === "reposts" ? 2.5 : 2} />
          </button>

          {/* Tagged Tab */}
          <button 
            onClick={() => setActiveTab("tagged")}
            className={`flex items-center justify-center py-4.5 -mt-[1px] cursor-pointer transition-colors ${
              activeTab === "tagged" 
                ? "border-t border-black text-black" 
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FiUser size={18} strokeWidth={activeTab === "tagged" ? 2.5 : 2} />
          </button>
        </div>

        {/* Tab Contents Stream */}
        {activeTab === "posts" && (
          userPosts.length > 0 ? (
            <div className="grid grid-cols-3 gap-1 md:gap-7.5 mt-2">
              {userPosts.map((post) => (
                <div 
                  key={post._id} 
                  onClick={() => setSelectedPostForComments(post)}
                  className="relative aspect-square group cursor-pointer overflow-hidden rounded-md border border-gray-100/50 shadow-sm bg-white"
                >
                  <img
                    src={post.images[0]}
                    alt="Post"
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-5 text-white">
                    <span className="font-semibold text-[15px] flex items-center gap-1.5">❤️ {post.likes?.length || 0}</span>
                    <span className="font-semibold text-[15px] flex items-center gap-1.5">💬 {post.comments?.length || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 font-medium">No posts yet</p>
            </div>
          )
        )}

        {/* Dynamic empty fallbacks for other tabs */}
        {activeTab !== "posts" && (
          <div className="text-center py-20 flex flex-col items-center select-none">
            <div className="w-[60px] h-[60px] rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 text-[26px] mb-3">
              {activeTab === "saved" && <FiBookmark />}
              {activeTab === "reposts" && <RiRepeat2Line />}
              {activeTab === "tagged" && <FiUser />}
            </div>
            <h3 className="font-semibold text-[18px] text-gray-800">No content available</h3>
            <p className="text-gray-400 text-sm mt-1">When you add elements, they will show up here.</p>
          </div>
        )}
      </div>

      {/* Followers Modal */}
      {showFollowers && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-instagram-border">
              <h3 className="font-semibold">Followers</h3>
              <button onClick={() => setShowFollowers(false)} className="text-2xl">×</button>
            </div>
            <div className="overflow-y-auto p-4 max-h-80">
              {followers.map((follower) => (
                <Link
                  key={follower._id}
                  to={`/profile/${follower._id}`}
                  className="flex items-center gap-3 mb-4"
                  onClick={() => setShowFollowers(false)}
                >
                  <img
                    src={getProfilePicture(follower.profilePicture)}
                    alt={follower.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{follower.username}</p>
                    <p className="text-instagram-gray text-xs">{follower.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Followings Modal */}
      {showFollowings && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-instagram-border">
              <h3 className="font-semibold">Following</h3>
              <button onClick={() => setShowFollowings(false)} className="text-2xl">×</button>
            </div>
            <div className="overflow-y-auto p-4 max-h-80">
              {followings.map((following) => (
                <Link
                  key={following._id}
                  to={`/profile/${following._id}`}
                  className="flex items-center gap-3 mb-4"
                  onClick={() => setShowFollowings(false)}
                >
                  <img
                    src={getProfilePicture(following.profilePicture)}
                    alt={following.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{following.username}</p>
                    <p className="text-instagram-gray text-xs">{following.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedPostForComments && (
        <CommentSection
          post={userPosts.find(p => p._id === selectedPostForComments._id) || selectedPostForComments}
          onClose={() => setSelectedPostForComments(null)}
        />
      )}
    </div>
  );
};

export default Profile;
