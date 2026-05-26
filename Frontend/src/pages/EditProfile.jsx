import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { updateProfile } from "../features/users/userActions";
import { setUser } from "../features/auth/authSlice";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
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
        navigate(`/profile/${user._id}`);
      }, 1500);
    } catch (err) {
      setError(err || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="card p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Upload */}
          <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-200">
            <div className="relative">
              <img
                src={previewUrl || getProfilePicture("")}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              />
              <label
                htmlFor="profilePicture"
                className="absolute bottom-0 right-0 bg-instagram-blue text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
              >
                <FiCamera size={20} />
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="text-center">
              <p className="font-semibold text-lg">{user?.username}</p>
              <p className="text-sm text-gray-500">Change profile photo</p>
            </div>
          </div>

          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Mobile Number"
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {success && (
            <div className="text-green-600 text-sm">
              Profile updated successfully! Redirecting...
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(`/profile/${user._id}`)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
