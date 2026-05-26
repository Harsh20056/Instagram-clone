import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  fetchUserProfile,
  fetchUserPosts,
  toggleFollowUser,
  fetchFollowers,
  fetchFollowings,
} from "../features/users/userActions";
import { FiGrid, FiSettings } from "react-icons/fi";
import Button from "../components/common/Button";
import { getProfilePicture } from "../utils/profilePicture";

const Profile = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user: currentUser } = useAuth();
  const { userProfile, userPosts, followers, followings } = useSelector((state) => state.users);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-instagram-blue"></div>
      </div>
    );
  }

  const isFollowing = userProfile.followers?.includes(currentUser?._id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Profile Picture */}
        <div className="flex justify-center md:justify-start">
          <img
            src={getProfilePicture(userProfile.profilePicture)}
            alt={userProfile.username}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <h2 className="text-2xl font-light">{userProfile.username}</h2>
            {isOwnProfile ? (
              <Link to="/edit-profile">
                <Button variant="secondary">
                  <FiSettings className="inline mr-2" />
                  Edit Profile
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleFollow}
                variant={isFollowing ? "secondary" : "primary"}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mb-6 justify-center md:justify-start">
            <div className="text-center md:text-left">
              <span className="font-semibold">{userPosts.length}</span>
              <span className="text-instagram-gray ml-1">posts</span>
            </div>
            <button onClick={handleShowFollowers} className="text-center md:text-left">
              <span className="font-semibold">{userProfile.followers?.length || 0}</span>
              <span className="text-instagram-gray ml-1">followers</span>
            </button>
            <button onClick={handleShowFollowings} className="text-center md:text-left">
              <span className="font-semibold">{userProfile.followings?.length || 0}</span>
              <span className="text-instagram-gray ml-1">following</span>
            </button>
          </div>

          {/* Bio */}
          <div>
            <p className="font-semibold">{userProfile.name}</p>
            {userProfile.email && (
              <p className="text-sm text-instagram-gray">{userProfile.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="border-t border-instagram-border pt-4">
        <div className="flex justify-center gap-12 mb-4">
          <button className="flex items-center gap-2 font-semibold text-sm border-t-2 border-black pt-4 -mt-4">
            <FiGrid size={12} />
            POSTS
          </button>
        </div>

        {userPosts.length > 0 ? (
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {userPosts.map((post) => (
              <div key={post._id} className="relative aspect-square group cursor-pointer">
                <img
                  src={post.images[0]}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                  <span className="font-semibold">❤️ {post.likes?.length || 0}</span>
                  <span className="font-semibold">💬 {post.comments?.length || 0}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-instagram-gray">No posts yet</p>
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
    </div>
  );
};

export default Profile;
