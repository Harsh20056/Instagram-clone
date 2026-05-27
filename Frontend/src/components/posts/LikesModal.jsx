import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { getProfilePicture } from "../../utils/profilePicture";

const LikesModal = ({ likes, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 antialiased select-none">
      <div className="bg-white rounded-2xl max-w-[400px] w-full max-h-[380px] overflow-hidden flex flex-col shadow-2xl border border-gray-150 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          <div className="w-[24px]"></div> {/* Spacer */}
          <h3 className="font-bold text-[15.5px] text-gray-950 text-center flex-1">Likes</h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-black cursor-pointer transition-colors p-1"
          >
            <FiX size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto flex-1 p-4 flex flex-col gap-4 scrollbar-none" style={{ scrollbarWidth: "none" }}>
          {likes && likes.length > 0 ? (
            likes.map((likeUser) => {
              const isObject = likeUser && typeof likeUser === "object";
              const username = isObject ? likeUser.username : "User";
              const name = isObject ? likeUser.name : "";
              const profilePic = isObject ? likeUser.profilePicture : "";
              const userId = isObject ? likeUser._id : likeUser;

              return (
                <div key={userId} className="flex items-center justify-between">
                  <Link
                    to={`/profile/${userId}`}
                    onClick={onClose}
                    className="flex items-center gap-3 min-w-0"
                  >
                    <img
                      src={getProfilePicture(profilePic)}
                      alt={username}
                      className="w-9 h-9 rounded-full object-cover border border-gray-100"
                    />
                    <div className="flex flex-col min-w-0">
                      <p className="font-semibold text-[13.5px] text-gray-950 leading-tight truncate hover:underline">{username}</p>
                      {name && (
                        <p className="text-gray-400 text-[12px] truncate mt-0.5">{name}</p>
                      )}
                    </div>
                  </Link>
                  <Link
                    to={`/profile/${userId}`}
                    onClick={onClose}
                    className="text-[12px] font-bold text-[#0095f6] hover:text-[#00376b] px-3.5 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors select-none"
                  >
                    View
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center select-none">
              <span className="text-gray-300 text-5xl mb-2.5">❤️</span>
              <p className="text-gray-400 font-bold text-sm">No likes yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikesModal;
