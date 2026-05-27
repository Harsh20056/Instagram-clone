import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  fetchPostComments,
  createComment,
  deleteComment,
} from "../../features/comments/commentActions";
import { toggleLikePost } from "../../features/posts/postActions";
import { FiX, FiHeart, FiTrash2, FiMessageCircle, FiSend, FiBookmark, FiSmile, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { getProfilePicture } from "../../utils/profilePicture";
import LikesModal from "./LikesModal";

const CommentSection = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const comments = useSelector((state) => state.comments.comments[post._id] || []);
  const [likedComments, setLikedComments] = useState({});
  const [showLikesList, setShowLikesList] = useState(false);

  const isLiked = post.likes?.some((like) => {
    const likeId = like && typeof like === "object" ? (like._id || like.id) : like;
    const userId = user?._id || user?.id;
    return likeId && userId && String(likeId) === String(userId);
  }) || false;

  const handleLike = () => {
    dispatch(toggleLikePost(post._id));
  };

  useEffect(() => {
    dispatch(fetchPostComments(post._id));
  }, [dispatch, post._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(createComment({ postId: post._id, comment }));
      setComment("");
    }
  };

  const handleDelete = (commentId) => {
    dispatch(deleteComment({ postId: post._id, commentId }));
  };

  const toggleCommentLike = (commentId) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 md:p-8 select-none">
      
      {/* Global screen close button */}
      <button 
        onClick={onClose} 
        className="fixed top-4 right-4 md:top-6 md:right-6 text-white hover:text-gray-300 z-55 cursor-pointer p-2 transition-all"
      >
        <FiX size={26} strokeWidth={2.5} />
      </button>

      {/* Main Split Modal Box */}
      <div className="bg-white max-w-[1000px] w-full h-[85vh] md:h-[80vh] flex flex-col md:flex-row overflow-hidden shadow-2xl rounded-r-lg rounded-l-none md:rounded-l-lg md:rounded-r-lg relative">
        
        {/* Left Side: Image Container */}
        <div className="md:w-[58%] h-1/2 md:h-full bg-black flex items-center justify-center relative">
          <img
            src={post.images[0]}
            alt="Post Image"
            className="w-full h-full object-contain"
          />

          {/* Tagged Overlay Button bottom left */}
          <div className="absolute bottom-4 left-4 bg-black/60 rounded-full p-2.5 text-white hover:bg-black/80 transition-colors cursor-pointer select-none">
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 5.522 4.477 9.999 9.999 9.999s9.999-4.477 9.999-9.999c0-5.522-4.477-9.999-9.999-9.999zm-4.717 14.803c.477-.923 2.197-1.603 4.717-1.603s4.24 0 4.717 1.603c-1.127 1.109-2.69 1.797-4.717 1.797s-3.59-.688-4.717-1.797zm6.717-6.803c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm1.656 3.659c-.91-.532-2.146-.859-3.656-.859s-2.746.327-3.656.859c-.442-.871-.694-1.849-.694-2.859 0-3.309 2.691-6 6-6s6 2.691 6 6c0 1.01-.252 1.988-.694 2.859z"/>
            </svg>
          </div>
        </div>

        {/* Right Side: Context Panel */}
        <div className="md:w-[42%] h-1/2 md:h-full flex flex-col bg-white">
          
          {/* Header */}
          <div className="flex items-center justify-between p-3.5 px-4.5 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <Link to={`/profile/${post.user_id?._id}`} className="shrink-0">
                <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-white p-[1px]">
                    <img
                      src={getProfilePicture(post.user_id?.profilePicture)}
                      alt={post.user_id?.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-1.5">
                <Link to={`/profile/${post.user_id?._id}`}>
                  <span className="font-bold text-[13.5px] text-gray-900 hover:text-gray-600 truncate max-w-[170px] leading-tight">
                    {post.user_id?.username}
                  </span>
                </Link>
              </div>
            </div>
            <button className="text-gray-700 hover:text-black cursor-pointer">
              <FiMoreHorizontal size={20} />
            </button>
          </div>

          {/* Caption & Comments List */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4.5 scrollbar-none" style={{ scrollbarWidth: "none" }}>
            
            {/* Post Caption */}
            {post.caption && (
              <div className="flex gap-3 items-start border-b border-gray-100/50 pb-4 pr-1">
                <Link to={`/profile/${post.user_id?._id}`} className="shrink-0">
                  <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-[1.5px] mt-0.5">
                    <div className="w-full h-full rounded-full bg-white p-[1px]">
                      <img
                        src={getProfilePicture(post.user_id?.profilePicture)}
                        alt={post.user_id?.username}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                </Link>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="text-[13.5px] text-gray-800 leading-normal font-normal">
                    <Link to={`/profile/${post.user_id?._id}`} className="font-semibold text-gray-900 mr-1.5 hover:text-gray-600">
                      {post.user_id?.username}
                    </Link>
                    <span>{post.caption}</span>
                  </div>
                  <span className="text-[12px] text-gray-400 mt-1 select-none">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            {/* Rendered Comments Loop */}
            {comments.map((commentItem) => {
              const isCommentLiked = !!likedComments[commentItem._id];
              return (
                <div key={commentItem._id} className="flex flex-col pr-1">
                  
                  {/* Main Comment Row */}
                  <div className="flex gap-3 items-start">
                    <Link to={`/profile/${commentItem.user_id?._id}`} className="shrink-0">
                      <img
                        src={getProfilePicture(commentItem.user_id?.profilePicture)}
                        alt={commentItem.user_id?.username}
                        className="w-8 h-8 rounded-full object-cover mt-0.5 border border-gray-100"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] text-gray-800 leading-normal font-normal">
                        <Link to={`/profile/${commentItem.user_id?._id}`} className="font-semibold text-gray-900 mr-1.5 hover:text-gray-600">
                          {commentItem.user_id?.username}
                        </Link>
                        <span>{commentItem.comment}</span>
                      </div>
                      
                      {/* Meta info row */}
                      <div className="flex items-center gap-3.5 text-[12px] text-gray-400 font-normal mt-1.5 select-none">
                        <span>{new Date(commentItem.createdAt).toLocaleDateString()}</span>
                        <button className="hover:text-gray-700 cursor-pointer font-semibold">Reply</button>
                        {commentItem.user_id?._id === user?._id && (
                          <button
                            onClick={() => handleDelete(commentItem._id)}
                            className="text-red-400 hover:text-red-600 font-semibold cursor-pointer flex items-center gap-0.5"
                          >
                            <FiTrash2 size={12} className="inline" /> Delete
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Comment Like Heart Button (Far Right) */}
                    <button 
                      onClick={() => toggleCommentLike(commentItem._id)}
                      className="text-gray-400 hover:text-red-500 hover:scale-110 active:scale-90 transition-all cursor-pointer pt-1 shrink-0 px-1.5"
                    >
                      {isCommentLiked ? (
                        <FaHeart size={11.5} className="text-[#ff3040]" />
                      ) : (
                        <FiHeart size={11.5} />
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Bottom Actions Summary Panel */}
          <div className="p-4 border-t border-gray-100 bg-white flex flex-col gap-1.5">
            {/* Action Buttons Row */}
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-4 text-gray-900">
                <button 
                  onClick={handleLike}
                  className="hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  {isLiked ? (
                    <FaHeart size={24} className="text-[#ff3040]" />
                  ) : (
                    <FiHeart size={24} />
                  )}
                </button>
                <button className="hover:scale-105 active:scale-95 transition-transform cursor-pointer">
                  <FiMessageCircle size={24} />
                </button>
                <button className="hover:scale-105 active:scale-95 transition-transform cursor-pointer transform rotate-45 -translate-y-0.5">
                  <FiSend size={22} />
                </button>
              </div>
              <button className="text-gray-900 hover:scale-105 active:scale-95 transition-transform cursor-pointer">
                <FiBookmark size={24} />
              </button>
            </div>

            {/* Likes Tally */}
            <button 
              type="button"
              onClick={() => setShowLikesList(true)}
              className="font-semibold text-[13.5px] text-gray-950 leading-tight flex items-center mt-1 hover:text-gray-600 cursor-pointer select-none active:scale-[0.98] transition-all bg-transparent border-0 p-0 outline-none w-fit text-left"
            >
              <span>{post.likes?.length || 0} likes</span>
            </button>

            {/* Timestamp */}
            <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider mt-0.5 select-none">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Add Comment input form */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-150 p-3.5 px-4.5 flex items-center gap-3 bg-white"
          >
            <button type="button" className="text-gray-800 hover:text-black cursor-pointer shrink-0">
              <FiSmile size={24} />
            </button>
            
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 text-[13.5px] outline-none text-gray-800 placeholder-gray-400 py-1.5 bg-transparent"
            />
            
            <button 
              type="submit" 
              disabled={!comment.trim()}
              className={`font-semibold text-sm cursor-pointer select-none shrink-0 ${
                comment.trim() 
                  ? "text-[#0095f6] hover:text-[#0081d6]" 
                  : "text-gray-300 cursor-not-allowed"
              }`}
            >
              Post
            </button>
          </form>

        </div>
      </div>

      {showLikesList && (
        <LikesModal
          likes={post.likes}
          onClose={() => setShowLikesList(false)}
        />
      )}
    </div>
  );
};

export default CommentSection;
