import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "../features/users/userActions";
import { setUser } from "../features/auth/authSlice";
import { FiCamera } from "react-icons/fi";
import { getProfilePicture } from "../utils/profilePicture";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
      setPreviewUrl(getProfilePicture(user.profilePicture));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image must be less than 5MB");
        return;
      }
      setProfilePicture(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobile", formData.mobile);

      if (profilePicture) {
        formDataToSend.append("profilePicture", profilePicture);
      }

      const updatedUser = await dispatch(updateProfile(formDataToSend)).unwrap();
      dispatch(setUser(updatedUser));
      setSuccess(true);
      setTimeout(() => {
        navigate(`/profile/${user?._id || user?.id}`);
      }, 1500);
    } catch (err) {
      setError(err || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] w-full flex justify-center py-10 md:py-24 px-6 antialiased">
      <div className="w-full max-w-[700px] bg-white border border-gray-200 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-10 md:p-16 h-fit mt-2">
        
        {/* Page Header */}
        <h1 className="text-[28px] font-bold text-gray-950 mb-10 tracking-tight">Edit profile</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Profile Photo Horizontal Row */}
          <div className="flex items-center gap-6 p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <div className="relative group cursor-pointer shrink-0">
              <img
                src={previewUrl || getProfilePicture("")}
                alt="Profile"
                className="w-18 h-18 rounded-full object-cover border border-gray-150 transition-all duration-200 group-hover:opacity-90"
              />
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-[#0095f6] hover:bg-[#0081d6] text-white p-2 rounded-full cursor-pointer transition-colors shadow-[0_2px_6px_rgba(0,0,0,0.15)] active:scale-90"
              >
                <FiCamera size={14} strokeWidth={2.5} />
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="font-bold text-[16px] text-gray-950 truncate leading-none">{user?.username}</span>
              <label htmlFor="profilePicture" className="text-[#0095f6] hover:text-[#00376b] font-bold text-[13.5px] cursor-pointer transition-colors select-none">
                Change profile photo
              </label>
            </div>
          </div>

          {/* Full Name Input */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[14px] font-bold text-gray-800 tracking-tight pl-0.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-5 py-4 text-[15px] text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-400 transition-all outline-none"
            />
          </div>

          {/* Username Input */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[14px] font-bold text-gray-800 tracking-tight pl-0.5">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-5 py-4 text-[15px] text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-400 transition-all outline-none"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[14px] font-bold text-gray-800 tracking-tight pl-0.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-5 py-4 text-[15px] text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-400 transition-all outline-none"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-[14px] font-bold text-gray-800 tracking-tight pl-0.5">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full bg-[#fafafa] border border-gray-200 rounded-xl px-5 py-4 text-[15px] text-gray-900 placeholder-gray-400 focus:bg-white focus:border-gray-400 transition-all outline-none"
            />
          </div>

          {/* Alert messages */}
          {error && (
            <div className="bg-red-50 text-red-600 text-[13px] px-5 py-4.5 rounded-xl border border-red-100 font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 text-[13px] px-5 py-4.5 rounded-xl border border-green-100 font-medium">
              Profile updated successfully! Redirecting...
            </div>
          )}

          {/* Actions button group */}
          <div className="flex gap-4 w-full mt-6">
            <button
              type="button"
              onClick={() => navigate(`/profile/${user?._id || user?.id}`)}
              className="flex-1 bg-[#efefef] text-gray-900 hover:bg-[#dbdbdb] active:scale-[0.98] transition-all font-bold text-[14.5px] py-4.5 rounded-xl text-center cursor-pointer select-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#0095f6] text-white hover:bg-[#0081d6] active:scale-[0.98] transition-all font-bold text-[14.5px] py-4.5 rounded-xl text-center cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;
