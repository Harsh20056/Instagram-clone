import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forgetPassword } from "../features/auth/authActions";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await dispatch(forgetPassword(email)).unwrap();
      setSuccess(true);
    } catch (err) {
      setError(err || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const isButtonDisabled = !email || loading;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-black font-sans px-4 antialiased">
      <div className="w-full max-w-[396px] flex flex-col">
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-start mb-5 w-full">
          {/* Subtle Padlock Icon */}
          <div className="mb-3 text-black">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-left mb-1 tracking-wide">
            Trouble logging in?
          </h2>
          <p className="text-left text-gray-500 text-[14px]">
            Enter your email and we'll send you a link to get back into your account.
          </p>
        </div>

        {success ? (
          /* Success Screen Variant */
          <div className="w-full flex flex-col gap-4">
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm">
              <p className="font-bold mb-0.5">Reset link sent!</p>
              <p className="text-green-600">
                A password reset link has been dispatched to your email address.
              </p>
            </div>
            
            <Link
              to="/login"
              className="w-full block text-center border border-gray-300 bg-white hover:bg-gray-50 font-semibold text-black rounded-full py-2.5 text-[15px] transition-colors"
            >
              Back to login
            </Link>
          </div>
        ) : (
          /* Form Reset Submission Block */
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3.5">
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-50 text-black border border-gray-300 rounded-lg px-4 py-3.5 text-[15px] focus:outline-none focus:border-gray-400 placeholder-gray-500"
            />

            {error && (
              <div className="text-red-500 text-sm text-center my-1">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full text-white text-base font-bold rounded-full py-3 mt-2 transition-all duration-200 ${
                isButtonDisabled 
                  ? "bg-blue-300 text-white/70 cursor-not-allowed" 
                  : "bg-[#0095f6] hover:bg-[#0081d6] cursor-pointer"
              }`}
            >
              {loading ? "Sending..." : "Send reset link"}
            </Button>

            {/* Divider element */}
            <div className="w-full flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-xs text-gray-500 font-bold tracking-wide">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Alternative Bottom Actions Navigation Group */}
            <div className="w-full flex flex-col gap-3">
              <Link
                to="/register"
                className="w-full block text-center border border-gray-300 bg-white hover:bg-gray-50 font-semibold text-black rounded-full py-2.5 text-[15px] transition-colors"
              >
                Create new account
              </Link>

              <Link
                to="/login"
                className="w-full block text-center border border-gray-300 bg-transparent hover:bg-gray-50 font-semibold text-[#0095f6] rounded-full py-2.5 text-[15px] transition-colors"
              >
                Back to login
              </Link>
            </div>
          </form>
        )}

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

export default ForgetPassword;