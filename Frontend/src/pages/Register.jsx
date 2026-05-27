import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authActions";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    mobile: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (formData.mobile.length !== 10)
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  // Simple state check to mirror the dynamic submit behavior
  const isButtonDisabled = status === "loading";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-black font-sans px-4 py-8 antialiased">
      <div className="w-full max-w-[396px] flex flex-col">

        {/* Header Section */}
        <h2 className="text-xl font-semibold text-left mb-1 self-start tracking-wide">
          Create an account
        </h2>
        <p className="text-left text-gray-500 text-[14px] mb-5 self-start">
          Sign up to see photos and videos from your friends.
        </p>

        {/* Input Form Fields */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
          <div className="relative w-full">
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg px-4 py-3.5 text-[15px] focus:outline-none focus:border-gray-400 placeholder-gray-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
          </div>

          <div className="relative w-full">
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg px-4 py-3.5 text-[15px] focus:outline-none focus:border-gray-400 placeholder-gray-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
          </div>

          <div className="relative w-full">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg px-4 py-3.5 text-[15px] focus:outline-none focus:border-gray-400 placeholder-gray-500"
            />
            {errors.username && <p className="text-red-500 text-xs mt-1 ml-1">{errors.username}</p>}
          </div>

          <div className="relative w-full">
            <Input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg px-4 py-3.5 text-[15px] focus:outline-none focus:border-gray-400 placeholder-gray-500"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1 ml-1">{errors.mobile}</p>}
          </div>

          <div className="relative w-full">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg px-4 py-3.5 text-[15px] focus:outline-none focus:border-gray-400 placeholder-gray-500"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center my-1">
              {error}
            </div>
          )}

          {/* Legal / Policy Text Block */}
          <p className="text-xs text-center text-gray-500 mt-2 px-1 leading-relaxed">
            By signing up, you agree to our Terms, Data Policy and Cookies Policy.
          </p>

          {/* Main Action Submit Pill Button */}
          <Button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full text-white text-base font-bold rounded-full py-3 mt-2 transition-all duration-200 ${isButtonDisabled
                ? "bg-blue-300 text-white/70 cursor-not-allowed"
                : "bg-[#0095f6] hover:bg-[#0081d6] cursor-pointer"
              }`}
          >
            {status === "loading" ? "Signing up..." : "Sign up"}
          </Button>
        </form>

        {/* Existing Account Navigation Secondary block */}
        <div className="w-full flex flex-col gap-3 mt-8">
          <Link
            to="/login"
            className="w-full block text-center border border-gray-300 bg-white hover:bg-gray-50 font-semibold text-[#0095f6] rounded-full py-2.5 text-[15px] transition-colors"
          >
            Log in instead
          </Link>
        </div>

        {/* Brand Meta Vector Footer */}
        <div className="flex items-center justify-center gap-1.5 mt-12 text-gray-500 text-xs font-medium tracking-wide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
            <path d="M16.5 6c-1.8 0-3.3 1-4.5 2.4C10.8 7 9.3 6 7.5 6 4.5 6 2 8.5 2 11.5S4.5 17 7.5 17c1.8 0 3.3-1 4.5-2.4 1.2 1.4 2.7 2.4 4.5 2.4 3 0 5.5-2.5 5.5-5.5S19.5 6 16.5 6zm0 9c-1.7 0-3.1-1.1-4-2.5 1-1.4 2.3-2.5 4-2.5 1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5zm-9 0C5.6 15 4 13.4 4 11.5S5.6 8 7.5 8c1.7 0 3.1 1.1 4 2.5-1 1.4-2.3 2.5-4 2.5z" />
          </svg>
          Meta
        </div>

      </div>
    </div>
  );
};

export default Register;