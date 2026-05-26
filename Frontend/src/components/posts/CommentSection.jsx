import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  fetchPostComments,
  createComment,
  deleteComment,
} from "../../features/comments/commentActions";
import { FiX, FiHeart, FiTrash2 } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { getProfilePicture } from "../../utils/profilePicture";

const CommentSection = ({ post, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const comments = useSelector((state) => state.comments.comments[post._id] || []);

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

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 bg-black flex items-center justify-center">
          <img
            src={post.images[0]}
            alt="Post"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Comments Section */}
        <div className="md:w-1/2 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-instagram-border">
            <div className="flex items-center gap-3">
              <Link to={`/profile/${post.user_id?._id}`}>
                <img
                  src={getProfilePicture(post.user_id?.profilePicture)}
                  alt={post.user_id?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
              <Link to={`/profile/${post.user_id?._id}`}>
                <span className="font-semibold text-sm">{post.user_id?.username}</span>
              </Link>
            </div>
            <button onClick={onClose}>
              <FiX size={24} />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Post Caption */}
            {post.caption && (
              <div className="flex gap-3 mb-4">
                <Link to={`/profile/${post.user_id?._id}`}>
                  <img
                    src={getProfilePicture(post.user_id?.profilePicture)}
                    alt={post.user_id?.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <div className="text-sm">
                    <Link to={`/profile/${post.user_id?._id}`} className="font-semibold mr-2">
                      {post.user_id?.username}
                    </Link>
                    <span>{post.caption}</span>
                  </div>
                  <div className="text-xs text-instagram-gray mt-1">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}

            {/* Comments */}
            {comments.map((comment) => (
              <div key={comment._id} className="flex gap-3 mb-4">
                <Link to={`/profile/${comment.user_id?._id}`}>
                  <img
                    src={getProfilePicture(comment.user_id?.profilePicture)}
                    alt={comment.user_id?.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <div className="text-sm">
                    <Link to={`/profile/${comment.user_id?._id}`} className="font-semibold mr-2">
                      {comment.user_id?.username}
                    </Link>
                    <span>{comment.comment}</span>
                  </div>
                  <div className="text-xs text-instagram-gray mt-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {comment.user_id?._id === user?._id && (
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="text-red-500"
                  >
                    <FiTrash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Comment Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-instagram-border p-4"
          >
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
      </div>
    </div>
  );
};

export default CommentSection;
