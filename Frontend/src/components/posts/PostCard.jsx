import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toggleLikePost } from "../../features/posts/postActions";
import { toggleFollowUser } from "../../features/users/userActions";
import { createComment } from "../../features/comments/commentActions";
import { FiHeart, FiMessageCircle, FiSend, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import CommentSection from "./CommentSection";
import { getProfilePicture } from "../../utils/profilePicture";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Safety checks
  if (!post || !post.images || !Array.isArray(post.images) || post.images.length === 0) {
    return null; // Don't render if post data is invalid
  }

  const isLiked = post.likes?.includes(user?._id);
  const isOwnPost = post.user_id?._id === user?._id;

  const handleLike = () => {
    dispatch(toggleLikePost(post._id));
  };

  const handleFollow = () => {
    if (!isOwnPost) {
      dispatch(toggleFollowUser(post.user_id._id));
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

  return (
    <>
      <div className="card mb-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.user_id?._id}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-0.5">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <img
                    src={getProfilePicture(post.user_id?.profilePicture)}
                    alt={post.user_id?.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </Link>
            <Link to={`/profile/${post.user_id?._id}`}>
              <span className="font-semibold text-sm">{post.user_id?.username}</span>
            </Link>
          </div>
          {!isOwnPost && (
            <button
              onClick={handleFollow}
              className="text-instagram-blue text-sm font-semibold"
            >
              Follow
            </button>
          )}
        </div>

        {/* Image Carousel */}
        <div className="relative aspect-square bg-black">
          <img
            src={post.images[currentImageIndex]}
            alt="Post"
            className="w-full h-full object-contain"
          />
          
          {post.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
              >
                <FiChevronRight size={20} />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {post.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex ? "bg-instagram-blue" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="p-4">
          <div className="flex items-center gap-4 mb-3">
            <button onClick={handleLike}>
              {isLiked ? (
                <FaHeart size={24} className="text-red-500" />
              ) : (
                <FiHeart size={24} />
              )}
            </button>
            <button onClick={() => setShowComments(true)}>
              <FiMessageCircle size={24} />
            </button>
            <button>
              <FiSend size={24} />
            </button>
          </div>

          {/* Likes */}
          <div className="font-semibold text-sm mb-2">
            {post.likes?.length || 0} likes
          </div>

          {/* Caption */}
          {post.caption && (
            <div className="text-sm mb-2">
              <Link to={`/profile/${post.user_id?._id}`} className="font-semibold mr-2">
                {post.user_id?.username}
              </Link>
              <span>{post.caption}</span>
            </div>
          )}

          {/* View Comments */}
          <button
            onClick={() => setShowComments(true)}
            className="text-sm text-instagram-gray mb-2"
          >
            View all comments
          </button>

          {/* Time */}
          <div className="text-xs text-instagram-gray uppercase">
            {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Comment Input */}
        <form onSubmit={handleComment} className="border-t border-instagram-border p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
            {comment.trim() && (
              <button type="submit" className="text-instagram-blue font-semibold text-sm">
                Post
              </button>
            )}
          </div>
        </form>
      </div>

      {showComments && (
        <CommentSection
          post={post}
          onClose={() => setShowComments(false)}
        />
      )}
    </>
  );
};

export default PostCard;
