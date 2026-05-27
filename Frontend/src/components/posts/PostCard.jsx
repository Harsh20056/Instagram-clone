import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toggleLikePost } from "../../features/posts/postActions";
import { toggleFollowUser } from "../../features/users/userActions";
import { createComment } from "../../features/comments/commentActions";
import { FiHeart, FiMessageCircle, FiSend, FiChevronLeft, FiChevronRight, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import CommentSection from "./CommentSection";
import { getProfilePicture } from "../../utils/profilePicture";
import LikesModal from "./LikesModal";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showLikesList, setShowLikesList] = useState(false);

  // Safety checks
  if (!post || !post.images || !Array.isArray(post.images) || post.images.length === 0) {
    return null; // Don't render if post data is invalid
  }

  const isLiked = post.likes?.some((like) => {
    const likeId = like && typeof like === "object" ? (like._id || like.id) : like;
    const userId = user?._id || user?.id;
    return likeId && userId && String(likeId) === String(userId);
  }) || false;

  const isOwnPost = String(post.user_id?._id || post.user_id) === String(user?._id || user?.id);

  useEffect(() => {
    const userId = user?._id || user?.id;
    if (userId && post.user_id?.followers) {
      const following = post.user_id.followers.some((f) => {
        const followerId = f && typeof f === "object" ? (f._id || f.id) : f;
        return followerId && String(followerId) === String(userId);
      });
      setIsFollowing(following);
    }
  }, [user, post.user_id?.followers]);

  const handleLike = () => {
    dispatch(toggleLikePost(post._id));
  };

  const handleFollow = () => {
    if (!isOwnPost) {
      dispatch(toggleFollowUser(post.user_id._id));
      setIsFollowing((prev) => !prev);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(createComment({ postId: post._id, comment }));
      setComment("");
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  // Mock post metadata formatting (e.g., time, audio)
  const timeFormatted = "6 d"; 

  return (
    <>
      <div className="bg-white border border-gray-200/80 md:rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02)] pb-4 mb-6 w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3.5 px-4.5">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.user_id?._id}`}>
              <div className="w-[40px] h-[40px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[2px]">
                <div className="w-full h-full rounded-full bg-white p-[1.5px]">
                  <img
                    src={getProfilePicture(post.user_id?.profilePicture)}
                    alt={post.user_id?.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <Link to={`/profile/${post.user_id?._id}`}>
                  <span className="font-semibold text-[14px] text-gray-900 hover:text-gray-600 leading-tight">
                    {post.user_id?.username}
                  </span>
                </Link>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-gray-500 text-[13px]">{timeFormatted}</span>
              </div>
              <span className="text-gray-500 text-[11px] font-normal leading-tight mt-0.5">Original audio</span>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            {!isOwnPost && (
              <button
                onClick={handleFollow}
                className={`text-[13px] font-semibold cursor-pointer transition-colors ${
                  isFollowing 
                    ? "text-gray-500 hover:text-gray-800" 
                    : "text-[#0095f6] hover:text-[#0081d6]"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}
            <button className="text-gray-700 hover:text-black cursor-pointer">
              <FiMoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative aspect-square bg-[#f8f9fa] border-y border-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={post.images[currentImageIndex]}
            alt="Post"
            className="w-full h-full object-contain"
          />

          {post.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/95 text-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full p-1.5 hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <FiChevronLeft size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/95 text-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.15)] rounded-full p-1.5 hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <FiChevronRight size={18} strokeWidth={2.5} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 backdrop-blur-[2px] px-2.5 py-1.5 rounded-full">
                {post.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-[6px] h-[6px] rounded-full transition-all duration-200 ${
                      index === currentImageIndex ? "bg-[#0095f6] scale-110" : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Actions & Description */}
        <div className="pt-3.5 pb-2 px-4.5 flex flex-col gap-2">
          {/* Action Row */}
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-center gap-4">
              <button onClick={handleLike} className="hover:scale-105 active:scale-95 transition-transform cursor-pointer">
                {isLiked ? (
                  <FaHeart size={24} className="text-[#ff3040]" />
                ) : (
                  <FiHeart size={24} className="text-gray-900" />
                )}
              </button>
              <button onClick={() => setShowComments(true)} className="hover:scale-105 active:scale-95 transition-transform cursor-pointer text-gray-900">
                <FiMessageCircle size={24} />
              </button>
              <button className="hover:scale-105 active:scale-95 transition-transform cursor-pointer text-gray-900 transform rotate-45 -translate-y-0.5">
                <FiSend size={22} />
              </button>
            </div>
          </div>

          {/* Likes */}
          <button 
            type="button"
            onClick={() => setShowLikesList(true)}
            className="font-semibold text-[14px] text-gray-900 leading-tight text-left hover:text-gray-500 cursor-pointer select-none active:scale-[0.98] transition-all bg-transparent border-0 p-0 outline-none w-fit"
          >
            {post.likes?.length || 0} likes
          </button>

          {/* Caption */}
          {post.caption && (
            <div className="text-[14px] text-gray-800 leading-relaxed font-normal">
              <Link to={`/profile/${post.user_id?._id}`} className="font-semibold text-gray-900 mr-2 hover:text-gray-600">
                {post.user_id?.username}
              </Link>
              <span>{post.caption}</span>
            </div>
          )}

          {/* View Comments link */}
          <button
            onClick={() => setShowComments(true)}
            className="text-sm text-gray-500 text-left hover:text-gray-700 cursor-pointer font-normal mt-0.5"
          >
            View all comments
          </button>

          {/* Comment Input */}
          <form onSubmit={handleComment} className="border-t border-gray-100 pt-2 mt-1">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 text-[13.5px] outline-none text-gray-800 placeholder-gray-400 py-1.5"
              />
              {comment.trim() && (
                <button type="submit" className="text-[#0095f6] hover:text-[#0081d6] font-semibold text-[13.5px] cursor-pointer">
                  Post
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {showComments && (
        <CommentSection
          post={post}
          onClose={() => setShowComments(false)}
        />
      )}

      {showLikesList && (
        <LikesModal
          likes={post.likes}
          onClose={() => setShowLikesList(false)}
        />
      )}
    </>
  );
};

export default PostCard;
