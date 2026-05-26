import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authActions";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // State flag for disabled or conditionally styled button look
  const isButtonDisabled = !formData.username || formData.password.length < 6 || status === "loading";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-black font-sans px-4 antialiased">
      <div className="w-full max-w-[396px] flex flex-col">
        
        {/* Header Text */}
        <h2 className="text-xl font-semibold text-left mb-5 self-start tracking-wide">
          Log in to Instagram
        </h2>

        {/* Input Form Section */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
          <Input
            type="text"
            name="username"
            placeholder="Mobile number, username or email address"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg px-4 py-3.5 text-[15px] focus:outline-none focus:border-gray-400 placeholder-gray-500"
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg px-4 py-3.5 text-[15px] focus:outline-none focus:border-gray-400 placeholder-gray-500"
          />

          {error && (
            <div className="text-red-500 text-sm text-center my-1">
              {error}
            </div>
          )}

          {/* Main Action Submit Button */}
          <Button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full text-white text-base font-bold rounded-full py-3 mt-2 transition-all duration-200 ${
              isButtonDisabled 
                ? "bg-blue-300 text-white/70 cursor-not-allowed" 
                : "bg-[#0095f6] hover:bg-[#0081d6] cursor-pointer"
            }`}
          >
            {status === "loading" ? "Logging in..." : "Log in"}
          </Button>
        </form>

        {/* Forgotten Password Link */}
        <Link
          to="/forget-password"
          className="text-[15px] font-medium text-[#0095f6] text-center mt-5 hover:underline block"
        >
          Forgotten password?
        </Link>

        {/* Secondary Alternative Action Grid */}
        <div className="w-full flex flex-col gap-3 mt-9">
          
          {/* Facebook Authentication Option */}
          <button 
            type="button" 
            className="w-full flex items-center justify-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 font-semibold text-black rounded-full py-2.5 text-[15px] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877f2" className="inline">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
            Log in with Facebook
          </button>

          {/* Registration Trigger Block */}
          <Link
            to="/register"
            className="w-full block text-center border border-gray-300 bg-white hover:bg-gray-50 font-semibold text-[#0095f6] rounded-full py-2.5 text-[15px] transition-colors"
          >
            Create new account
          </Link>
        </div>

        {/* Brand Meta Vector Footer */}
        <div className="flex items-center justify-center gap-1.5 mt-12 text-gray-500 text-xs font-medium tracking-wide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-80">
            <path d="M16.5 6c-1.8 0-3.3 1-4.5 2.4C10.8 7 9.3 6 7.5 6 4.5 6 2 8.5 2 11.5S4.5 17 7.5 17c1.8 0 3.3-1 4.5-2.4 1.2 1.4 2.7 2.4 4.5 2.4 3 0 5.5-2.5 5.5-5.5S19.5 6 16.5 6zm0 9c-1.7 0-3.1-1.1-4-2.5 1-1.4 2.3-2.5 4-2.5 1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5zm-9 0C5.6 15 4 13.4 4 11.5S5.6 8 7.5 8c1.7 0 3.1 1.1 4 2.5-1 1.4-2.3 2.5-4 2.5z"/>
          </svg>
          Meta
        </div>

      </div>
    </div>
  );
};

export default Login;